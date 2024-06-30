import './CategoryList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CategoryList = () => {
    const [modal, setModal] = useState(false); // modal state
    const [list, setList] = useState([]); // api 리스트
    const [categoryInput, setCategoryInput] = useState({
        category_name: '',
        category_price: ''
      });
    
    // input value 등록
    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setCategoryInput({
        ...categoryInput,
        [name]: value
        });
    }
    // api list 가져옴
    const apiList = async () => {
        const url = '/getList';
        const response = await axios.get(url);
        return response.data;
    };

    const getList = async () => {
        try {
            const data = await apiList();
            const listFromApi = data.list;
            setList(listFromApi);
        } catch (error) {
            console.error(`Error list:`, error);
        }
    };

    useEffect(() => {
        getList()
    }, []); 

    // modal open
    const openModal = () => {
        setModal(true);
    }

    // 확인 버튼 클릭 시
    const addedApi = async () => {
        const category_name = categoryInput.category_name;
        const category_price = categoryInput.category_price;

        if (category_name == '') {
            alert('error!');
            return false;
        }
        if (!category_price) {
            alert('error!');
            return false;
        }

        let params = {
            category_name: category_name,
            category_price: category_price,
            category_sort: 0,
            category_cha: 1,
            parent_id: 0
        }
        const url = '/add';
        const response = await axios.post(url, params);
        console.log(response.data.code)
       
        if (response.data.code === 200){
            getList()
            category_name.delete()
            setModal(false)
        }
    }
    return (
        <div className="CategoryList">
            <div className='row align-items-center justify-content-end row-cols-4' style={{ width: '100%' }}>
                <button 
                    className='openModal btn btn-secondary' type='button'
                    onClick={openModal}
                >
                    카테고리 추가
                </button>    
            </div>
            {
                modal &&
                    <div className='modalContainer'>
                        <div className='modalContent'>
                            <div className='addCategoryArea'>
                                시술명: <input type='text' name='category_name' value={categoryInput.category_name} onChange={onChangeValue}/>
                                금액: <input type='number' name='category_price' value={categoryInput.category_price} onChange={onChangeValue}/>
                            </div>
                            <div className='btn_wrap '>
                                <button className='btn-point-dark btn_small' 
                                    onClick={addedApi}>
                                    확인</button>
                                <button className='btn-point-dark btn_small' onClick={() => setModal(false)}>닫기</button>
                            </div>
                        </div>
                    </div>
            }
            <div className='row flex-column'>
                <div className='row row-cols-2 align-items-center th'>
                    <div className='text-center'>시술 명</div>
                    <div className='text-center'>비용</div>
                </div>
                {
                    list.map((item, index) => {
                        return (
                            <div key={index} className='row row-cols-2 align-items-center td'>
                                <div className='text-center'>{item.category_name}</div>
                                <div className='text-center'>{item.category_price}₩</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default CategoryList;

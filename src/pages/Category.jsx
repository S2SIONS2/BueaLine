import { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.scss';
import CategoryList from '../components/CategoryList';

const Category = () => {
    // 모달 생성
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    };

    // 카테고리 기본 설정
    const [inputValue, setInputValue] = useState([{ category_name: '', category_price: '' }]);
    
    // 카테고리 추가 시
    const addCategory = () => {
        setInputValue([...inputValue, { category_name: '', category_price: '' }]);
    };

    // 카테고리 삭제
    // const deleteCategory = (index) => {
    //     const newInputValues = inputValue.filter((_, i) => i !== index);
    //     setInputValue(newInputValues);
    // };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newInputValues = [...inputValue];
        newInputValues[index] = { ...newInputValues[index], [name]: value };
        setInputValue(newInputValues);
    };

    const [valueArray, setValueArray] = useState([]);

    const categoryConfirm = async () => {
        try {
            if (inputValue.every(item => item.category_name !== '' && item.category_price !== '')) {
                for (const item of inputValue) {
                    await addApi(item);
                }
                setValueArray(inputValue);
                setModal(false);
            } else if (inputValue.every(item => item.category_name !== '')) {
                alert('비용을 입력 해주세요.');
            } else if (inputValue.every(item => item.category_price !== '')) {
                alert('시술 명을 입력 해주세요.');
            } else {
                setModal(false);
            }
        } catch (error) {
            console.log(`Error occured:`, error);
        }
    };

    const addApi = async (item) => {
        const url = '/add';
        const params = {
            parent_id: 0,
            category_name: item.category_name,
            category_price: item.category_price,
            category_sort: 0,
            category_cha: 1,
        };
        const response = await axios.post(url, params);
        return response.data;
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('/getList');
                setValueArray(response.data.list);
            } catch (error) {
                console.log('Error Occured:', error);
            }
        };
        fetchInitialData();
    }, []);

    

    return (
        <div className='Category'>
            <div className='subTitle'>Category</div>
            <div className='row align-items-center justify-content-end row-cols-4' style={{ width: '100%' }}>
                <button 
                    className='openModal btn btn-secondary' type='button'
                    onClick={openModal}
                >
                    카테고리 추가
                </button>    
            </div>
            <section>
                <CategoryList valueArray={valueArray} setValueArray={setValueArray}/>
            </section>

            {
                modal && 
                <article className='modalContainer'>
                    <div className='modalHeader'>카테고리 추가</div>
                    <div className='modalContent'>
                        <div className='row align-items-center justify-content-end row-cols-4' style={{ '--bs-gutter-x': '0px' }}>
                            <button 
                                className='btn btn-point-dark' type='button'
                                onClick={addCategory}
                            >
                                항목 추가
                            </button>
                        </div>
                        <div className='addCategory'>
                            {
                                inputValue.map((item, index) => (
                                    <div 
                                        className='categoryWrap'
                                        key={index}
                                    >
                                        {/* <div className='btn_wrap'>
                                            <button className='btn btn-point-dark' type='button' onClick={() => deleteCategory(index)}>삭제</button>
                                        </div> */}
                                        <div className='row align-items-center'>
                                            <div className='col-4'>시술 명</div>
                                            <div className='col-8'>
                                                <input
                                                    className='col-12' 
                                                    type='text'
                                                    name='category_name'
                                                    value={item.category_name}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                        </div>
                                        <div className='row row-cols-2 align-items-center'>
                                            <div className='col-4'>금액</div>
                                            <div className='col-8'>
                                                <input
                                                    className='col-12'
                                                    type='number'
                                                    name='category_price'
                                                    value={item.category_price}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='btn_wrap'>
                            <button 
                                type='button' 
                                className='btn btn-point-dark'
                                onClick={categoryConfirm}
                            >
                                확인
                            </button>
                            <button 
                                type='button' 
                                className='btn btn-light'
                                onClick={() => setModal(false)}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </article>
            }
        </div>
    );
};

export default Category;

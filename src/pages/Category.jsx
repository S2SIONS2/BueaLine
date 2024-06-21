import { useState} from 'react';
import axios from 'axios';
import './Category.scss';
import CategoryList from '../components/CategoryList';

const Category = () => {
    // 모달 생성
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    };

    // 카테고리 기본 폼
    const [inputValue, setInputValue] = useState([{ name: '', expense: '' }]);
    // 카테고리 추가
    const addCategory = () => {
        setInputValue([...inputValue, { name: '', expense: '' }]);
    };

    // 카테고리 삭제
    const deleteCategory = (index) => {
        const newInputValues = inputValue.filter((_, i) => i !== index);
        setInputValue(newInputValues)
    }
    // input handling
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newInputValues = [...inputValue];
        newInputValues[index] = { ...newInputValues[index], [name]: value };
        setInputValue(newInputValues);
    };

    // 확인 버튼 클릭 시 리스트 넘기기
    const [valueArray, setValueArray] = useState([])
    const categoryConfirm = () => {
        if(inputValue.every(item => item.name !== '' && item.expense !== '')){
            setValueArray(inputValue);
            setModal(false)
        }else if(inputValue.every(item => item.name !== '')){
            alert('비용을 입력 해주세요.')
        }else if(inputValue.every(item => item.expense !== '')){
            alert('시술 명을 입력 해주세요.')
        }else{
            setModal(false)
        }
    };

    // add 카테고리 api 리스트
    const addApi = async () => {
        const url = '/add'
        let params = {
            parent_id: 0,
            category_name: '',
            category_price: '',
            category_sort: 0,
            category_cha: 1,
        }
        const response = await axios.post(url, params)
        return response.data
    }

    useState(() => {
        const addToApi = async () => {
            try{
                const data = await addApi()
                const list = data.list
                setValueArray(list)
            }catch(error){
                console.log('Error Occured:', error)
            }
        }
        addToApi()
    }, [])

    return (
        <div className='Category'>
            <div className='subTitle'>Category</div>
            <div className='row align-items-center justify-content-end row-cols-4' style={{ width: '100%' }}>
                <button 
                    className='openModal btn btn-secondary' type='button'
                    onClick={openModal}
                >
                    카테고리 관리
                </button>    
            </div>
            <section>
                <CategoryList valueArray={valueArray}/>
            </section>

            {
                modal && 
                <article className='modalContainer'>
                    <div className='modalHeader'>카테고리 관리</div>
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
                                        <div className='btn_wrap'>
                                            <button className='btn btn-point-dark' type='button' onClick={() => deleteCategory(index)}>삭제</button>
                                        </div>
                                        <div className='row align-items-center'>
                                            <div className='col-4'>시술 명</div>
                                            <div className='col-8'>
                                                <input
                                                    className='col-12' 
                                                    type='text'
                                                    name='name'
                                                    value={item.name}
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
                                                    name='expense'
                                                    value={item.expense}
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
                                onClick={() => {
                                    categoryConfirm()
                                    
                                }}
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

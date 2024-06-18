import { useState } from 'react';
import './Category.scss';
import CategoryList from '../components/CategoryList';

const Category = () => {
    // 모달 생성
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    };

    // 카테고리 추가
    const [inputValue, setInputValue] = useState([{ name: '', expense: '' }]);
    const [form, setForm] = useState({
        count: 1,
        element: ''
    });
    
    const addCategory = () => {
        setForm({
            ...form,
            count: form.count + 1
        });
        setInputValue([...inputValue, { name: '', expense: '' }]);
    };

    // 카테고리 삭제
    const deleteCategory = (index) => {
        const newInputValues = inputValue.filter((_, i) => i !== index);
        setInputValue(newInputValues)
        setForm({
            ...form,
            count: form.count - 1
        })
    }
    // input handling
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newInputValues = [...inputValue];
        newInputValues[index] = { ...newInputValues[index], [name]: value };
        setInputValue(newInputValues);
    };

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
            <section className=''>
                <CategoryList />
            </section>

            {
                modal && 
                <article className='modalContainer'>
                    <div className='modalHeader'>카테고리 관리</div>
                    <div className='modalContent'>
                        <div className='row align-items-center justify-content-end row-cols-4' style={{ '--bs-gutter-x': '0px' }}>
                            <button 
                                className='btn btn-secondary' type='button'
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
                                        <div className='row align-items-center justify-content-end'>
                                            <button className='btn btn-light' type='button' onClick={() => deleteCategory(index)}>삭제</button>
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
                                className='btn btn-secondary'
                                onClick={() => {
                                    alert('저장이 완료되었습니다.');
                                }}
                            >
                                확인
                            </button>
                            <button 
                                type='button' 
                                className='btn btn-secondary'
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

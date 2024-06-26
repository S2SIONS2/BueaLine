import './CategoryList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CategoryList = ({ valueArray }) => {
    const [list, setList] = useState([]); // api 리스트

    const apiList = async () => {
        const url = '/getList';
        const response = await axios.get(url);
        return response.data;
    };

    useEffect(() => {
        const getList = async () => {
            try {
                const data = await apiList();
                const listFromApi = data.list;
                setList([...valueArray, ...listFromApi]);
            } catch (error) {
                console.error(`Error list:`, error);
            }
        };
        getList();
    }, [valueArray]);

    return (
        <div className="CategoryList">
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

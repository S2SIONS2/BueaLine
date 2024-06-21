import './CategoryList.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'


const CategoryList = ({valueArray}) => {
    const apiList = async () => {
        const url = '/getList'
        const response = await axios.get(url)
        return response.data
    }

    const [list, setList] = useState([]);
    useEffect(() => {
        const getList = async () => {
            try{
                const data = await apiList()
                const list = data.list;
                setList(list)
            }catch(error){
                console.error(`Error list:`, error);
            }
        }
        console.log('getList: ', getList())
        getList()
    }, []);

    return(
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
                            <div>{item.category_name}</div>
                            <div>{item.category_price}₩</div>
                        </div>
                    )
                })
            }
            </div>
            {/* {
                valueArray.map((item, index) => {
                    return(
                        <div key={index}>
                            <div className='row row-cols-2 align-items-center td'>
                                <div>{item.name}</div>
                                <div>{item.expense}₩</div>
                            </div>
                            <div className='row row-cols-2 align-items-center td'>
                                
                            </div>
                        </div>
                    )
                })
            }    */}
            
        </div>
    )
}

export default CategoryList;
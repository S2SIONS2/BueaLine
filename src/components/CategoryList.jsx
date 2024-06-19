import './CategoryList.scss'

const CategoryList = ({inputValue}) => {
    return(
        <div className="CategoryList">
            <div className='row flex-column'>
                <div className='row row-cols-2 align-items-center th'>
                    <div>시술 명</div>
                    <div>비용</div>
                </div>
                <div className='row row-cols-2 align-items-center'>
                    <div>눈썹</div>
                    <div>150,000</div>
                </div>
            </div>
            {
                inputValue.map((item, index) => {
                    return(
                        <div key={index}>
                            <div className='row row-cols-2 align-items-center th'>
                                <div>{item.name}</div>
                                <div>{item.expense}</div>
                            </div>
                            <div className='row row-cols-2 align-items-center'>
                                
                            </div>
                        </div>
                    )
                })
            }   
        </div>
    )
}

export default CategoryList;
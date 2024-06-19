import './CategoryList.scss'

const CategoryList = ({valueArray}) => {
    console.log('valueArray:', valueArray);
    
    return(
        <div className="CategoryList">
            <div className='row flex-column'>
                <div className='row row-cols-2 align-items-center th'>
                    <div>시술 명</div>
                    <div>비용</div>
                </div>
                <div className='row row-cols-2 align-items-center'>
                    <div>눈썹</div>
                    <div>150,000원</div>
                </div>
            </div>
            {
                valueArray.map((item, index) => {
                    return(
                        <div key={index}>
                            <div className='row row-cols-2 align-items-center th'>
                                <div>{item.name}</div>
                                <div>{item.expense}₩</div>
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
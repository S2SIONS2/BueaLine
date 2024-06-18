import './CategoryList.scss'


const CategoryList = (inputValue, form) => {
    return(
        <div className="CategoryList">        
            <div className='row flex-column'>
                <div className='row row-cols-2 align-items-center th'>
                    <div>시술</div>
                    <div>비용</div>
                </div>
                <div className='row row-cols-2 align-items-center'>
                    <div>눈썹</div>
                    <div>150,000</div>
                </div>
            </div>
        </div>
    )
}

export default CategoryList;
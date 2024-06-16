import './reset.css'
import './App.scss'

function App() {

  return (
    <>
      <div className="App">
        <div className='title'>BeauLine</div>
        <div className='info'>
          안녕하세요 <span>이시온</span> 님
        </div>
        <div className="row row-cols-2 text-center">
          <button className="navBtn">
            <a href='#'>주소록</a>
          </button>
          <button className="navBtn">
            <a href='#'>문자</a>
          </button>
          <button className="navBtn">
            <a href='#'>작업 카테고리</a>
          </button>
          <button className="navBtn">
            <a href='#'>작업 내역</a>
          </button>
          <button className="navBtn">
            <a href='#'>작업 후 처리 예정</a>
          </button>
          <button className="navBtn">
            <a href='#'>통계 차트</a>
          </button>
        </div>
    </div>
    </>
  )
}

export default App;

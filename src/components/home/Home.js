import "./Home.css";
// import articleImage from "";

function Home() {
  return (
    <div className='articleHome'>
      {/* <img src={articleImage} alt="" className="artcleImage" /> */}
      <h1 style={{color:'var(--dark-green)'}}>BlogIt</h1>
      <img src="https://t4.ftcdn.net/jpg/06/50/65/57/240_F_650655771_zKqsdMgik8iNU9RgxesHbrllJ35uuOej.jpg" className="container-fluid"></img>
    </div>
  );
}

export default Home;
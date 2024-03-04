import '../css/Home.css';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Table from "../components/Table";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
// import { db } from '../config/firebase';
// import { getDocs, collection } from 'firebase/firestore';
// const collectionRef = collection(db, 'collection_name');
/* Firebase Stuffs are commented out for now */
function Home() {
// const [ collectionList, setCollectionList ] = useState([]);
/* More Firebase Stuffs ( I'm stuffs! ) */
// useEffect(() => {
//   const getCollectionList = async () => {
//   try{
//       const data = await getDocs(collectionRef);
//       const filteredData = data.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id
//       }))
//       setCollectionList(filteredData);
      
//   }catch(error){
//       console.error(error);
//   }
//   }
//   getCollectionList();
// }, [])
  return (
    <>
      <Navbar />
      <div id='home_main_div'>
        <div className='px-3 pt-3 mb-3'>
          <h1 className='dashboard-text'>DASHBOARD</h1>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col col-sm-12 col-md-4 col-lg-4 mb-2'>
              <PieChart soil_data={temp_data} />
            </div>
            <div className='col col-sm-12 col-md-8 col-lg-8 mb-2'>
              <LineChart soil_data={temp_data} />
            </div>
          </div>
          <div className='row'>
            <div className="col mb-2">
              <Table soil_data={temp_data} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </> 
  )
}

  export default Home

  const temp_data = [
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 15, date: '03/17/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 10, date: '03/17/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 7, date: '03/17/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/17/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 3, date: '03/17/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 10, date: '03/18/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 7, date: '03/18/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 5, date: '03/18/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 3, date: '03/18/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/18/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 11, date: '03/19/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 8, date: '03/19/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 7, date: '03/19/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/19/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 3, date: '03/19/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 9, date: '03/20/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 5, date: '03/20/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 5, date: '03/20/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 2, date: '03/20/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/20/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 10, date: '03/21/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 7, date: '03/21/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 7, date: '03/21/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/21/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/21/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/23/2024'},
  ];

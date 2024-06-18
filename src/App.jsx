import { getDatabase } from "firebase/database";
const database = getDatabase();
import { db } from "./firebase";
import { useEffect, useState } from 'react'
import { doc, updateDoc, deleteDoc, getDocs, collection, addDoc, onSnapshot } from "firebase/firestore";
import { notification, Button } from 'antd'
import './App.css'

function App() {
  ///////////////////////////// CRUD useState////////////////////////////////////////////
  const [ism, setIsm] = useState();
  const [email, setEmail] = useState();
  const [img, setImg] = useState();
  const [id, setId] = useState();
  const [fetchdata, setFetchdata] = useState([]);
  const [show, setShow] = useState(true);

  //  ///////////////////////// Jonatish ////////////////////
  const dbjonatish = collection(db, 'newCRUD');

  const jonatish = async () => {
    const malumotJonatish = await addDoc(dbjonatish,
      {
        ism: ism,
        email: email,
        img: img
      });
    if (ism === '' || email === '' || img === '') {
      return notification.error({
        message: "Malumot jonatilmadi",
        description: "Siz kiritgan malumotlar to'lliq tugallanmagan !"
      });
    }
    else {
      if (malumotJonatish) {
        setIsm('');
        setEmail('');
        setImg('');
        return notification.success({
          message: "Malumot jonatildi",
          description: "Siz kiritgan malumotlar yuborildi"

        });
      }
      else {

      }
    }


  }


  ///////////////////////////// CRUD ////////////////////////////////////////////

  const [xato, setXato] = useState('Malumotlarni kiriting !');
  const [batafsil, setBatafsil] = useState('Malumotlarni Toliq kiriting aks holda xato bolishi mumkun  !');

  // //////////////////// useEFfekt ////////////////////////////////////////////////
  // const fetch = async () => {
  //   const snapshot = await getDocs(dbjonatish);
  //   const fetchdata = snapshot.docs.map((doc => ({
  //     id: doc.id,
  //     ...doc.data()
  //   })));
  //   setFetchdata(fetchdata);
  // }
  let baza = collection(db, 'newCRUD')
  useEffect(() => {
    onSnapshot(
      baza, (snapshot) => {
        let malumot = [];
        snapshot.docs.forEach((doc) => {
          malumot.push({ ...doc.data(), id: doc.id })
        });
        setFetchdata(malumot)
      }
    )
    fetch()
  }, []);


  // //////////////////// Update //////////////////////
  const ozgar = async (id) => {
    const matchId = fetchdata.find((data) => {
      setShow(false);
      return data.id === id
    })
    setIsm(matchId.ism);
    setEmail(matchId.email);
    setImg(matchId.img);
    setId(matchId.id);
  }
  const update = async () => {
    const updatejonatish = doc(dbjonatish, id)

    try {
      const updatedata = await updateDoc(updatejonatish, {
        ism: ism,
        email: email,
        img: img
      });
      setShow(true);
      setIsm('');
      setEmail('');
      setImg('');
      return notification.info({
        message: "Malumot ozgartirildi"
      })
    }
    catch (error) {

    }
  }
  ///////////////////// DELETE /////////////////////////////////

  const del = async (id) => {
    const deljonatish = doc(dbjonatish, id)
    try {
      await deleteDoc(deljonatish)
      return notification.success({
        message: "Malumot o'chirildi"
      })
    }
    catch (error) {
      return error
    }
  }
  // Hozirgi vaqtni olish
  let hozir = new Date();

  // Yil, kun, soat, daqiqalar va sekundlarni olish
  let yil = hozir.getFullYear();
  let oy = hozir.getMonth() + 1; // Oylar 0 dan 11 gacha sanalgan, shuning uchun +1 qo'shish kerak
  let kun = hozir.getDate();
  let soat = hozir.getHours();
  let daqiqa = hozir.getMinutes();
  let sekund = hozir.getSeconds();

  

  return (
    <>
      <div className="box" id="rr">
        <section class="text-gray-400 bg-gray-900 body-font h-[100vh]">
          <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 class="title-font font-medium text-3xl text-white">{xato}</h1>
              <p class="leading-relaxed mt-4">{batafsil}</p>
            </div>
            <div class="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 class="text-white text-lg font-medium title-font mb-5">Kiritish</h2>
              <div class="relative mb-4">
                {/*   ////////////////////////  ism    ////////////////////// */}
                <label for="full-name" class="leading-7 text-sm text-gray-400">Ism Familya</label>
                <input type="text" autoComplete="off" onChange={(e) => setIsm(e.target.value)} value={ism} class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              {/*   ////////////////////////  email  ////////////////////// */}

              <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-400">E-mail</label>
                <input type="text" autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              {/*   //////////////////////// Rasm   ////////////////////// */}

              <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-sm text-gray-400">Rasm (URL)</label>
                <input type="text" autoComplete="off" onChange={(e) => setImg(e.target.value)} value={img} class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>



              {
                show ? <button onClick={jonatish} class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Jonatish</button> :
                  <button onClick={update} class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-2">Udate</button>
              }

            </div>
          </div>
        </section>




        <section class="text-gray-400 bg-gray-900 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col">
              <div class="h-1 bg-gray-800 rounded overflow-hidden">
                <div class="w-24 h-full bg-blue-500"></div>
              </div>
              <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                <h1 class="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0">Malumotlar</h1>
                <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Sizning malumotlaringiz bizning bazada saqlandi , siz uni ochirishingiz va ozgartirishingiz mumkun.</p>
              </div>
            </div>
            <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">


              {

                fetchdata.map((data) => {
                  return (
                    <>
                      <div class="p-4 md:w-[300px] sm:mb-0 mb-6 shadow-lg border border-gray-700  rounded-xl	ml-3 mt-3">
                        <div class="rounded-lg h-64 overflow-hidden">
                          <img alt="content" class="object-cover object-center h-full w-full" src={data.img} />
                        </div>
                        <h2 class="text-xl font-medium title-font text-white mt-5">Ism: {data.ism}</h2>
                        <p class="text-base leading-relaxed mt-2 text-white">E-mail: {data.email}</p>
                       <div className="kun">
                       <span> {kun}.0{oy}.{yil} yil</span> <span>{soat}:{daqiqa}:{sekund}s</span>
                       </div>
                        <div className="button">
                          <button onClick={() => ozgar(data.id)} ><a href="#rr">Update</a></button>
                          <button onClick={() => del(data.id)}>Delete</button>
                        </div>

                      </div>
                    </>
                  )
                })
              }


            </div>
          </div>
        </section>
      </div>




    </>
  )
}

export default App

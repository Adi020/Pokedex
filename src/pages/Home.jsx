import { useDispatch } from "react-redux"
import FooterHome from "../components/home/FooterHome"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { Navigate, useNavigate } from "react-router-dom"

const Home = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainer(nameTrainer))
        navigate("/pokedex")
    }

  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen bg-gray-50 ">

        {/* seccion superior */}
        <section className="flex flex-col justify-center text-center">

            <div>
                <img className="w-3/4 mx-auto max-w-[600px]" src="/Images/logo.png" alt="" />
            </div>

            <h3 className="mt-8 text-4xl text-red-500 font-bold">¡Hello trainger!</h3>

            <p className=" font-medium pb-7">For start give me your name:</p>

            <section className="flex justify-center items-center ">

              <form className="px-8 w-3/4 " onSubmit={handleSubmit}>
                <input className=" w-3/4 h-[60px] rounded-tl-md rounded-bl-md px-5 font-medium max-w-[600px] shadow-md" placeholder="Name Here..." required id="nameTrainer" type="text" />
                <button className=" w-1/4 h-[63px] rounded-tr-md rounded-br-md bg-red-600 text-white overflow-hidden hover:bg-red-500 max-w-[240px] shadow-md">¡Start!</button>
              </form>

            </section>
            

        </section>

        {/* seccion inferior */}
        <FooterHome />

        

    </main>
  )
}

export default Home
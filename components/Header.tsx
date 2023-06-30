import { useSession } from "next-auth/react"
import Image from "next/image"
import { AiOutlineMenu } from "react-icons/ai"

interface HeaderProps {
    setShow: (prev: boolean) => void
}
const Header: React.FC<HeaderProps> = ({setShow}) => {
    const {data: session }= useSession()
   
  return (
    <div className=" text-blue-900 flex justify-between items-center">
        <AiOutlineMenu size={26} onClick={() => setShow(true)}/>
    <div className=" flex bg-gray-300 text-black items-center rounded-lg pr-2 overflow-hidden">
      <Image
        src={session?.user?.image? session?.user?.image : '/images/defaultAvatar.png'}
        width={40}
        height={40}
        alt="User image"
        className=""
      />
      <p>{session?.user?.name}</p>
    </div>
  </div>
  )
}

export default Header

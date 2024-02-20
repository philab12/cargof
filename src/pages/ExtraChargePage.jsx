import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'
import Copyright from '../components/CopyrightComp'
import AdminFooter from '../components/AdminFooter'
import ExtraChargeList from "../features/extraCharge/ExtraChargeList"
import ExtraChargeModal from '../modals/ExtraChargeModal'


function ExtraChargePage(props) {
    const page = props.page
    return (
        <> 

                        <Breadcrumb aria-label="Default breadcrumb example">
                            <Link to="/" className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
                                <HiHome/>
                                Home
                                <FaAngleRight/>
                            </Link> 
                            <Link className='flex items-center gap-2 text-sm font-semibold ml-2 text-gray-500'>
                                Setups
                                <FaAngleRight/>
                            </Link>
                            <Link className='text-sm font-semibold ml-2'>
                                Extra Charge
                            </Link>
                        </Breadcrumb>
                        <div className='my-5 p-5 bg-white rounded-md'>
                            <section className='flex justify-between'>
                                <h1 className=''>Extra Charge (Later I'll add a filter by trip and electronic)</h1>
                                <ExtraChargeModal/>
                            </section>
                        </div>
                        <div className='contentTable w-full'>
                            <ExtraChargeList/>
                        </div>
       
        </>
    )
}

export default ExtraChargePage
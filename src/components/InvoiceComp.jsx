import Logo from '../assets/img/passionAirLogo2.png';
import { Table } from 'flowbite-react';
import {useSelector } from 'react-redux';
import { selectTrackRep, selectTrackingNumber } from '../features/transaction/transSlice';
import { selectAllTransactions, selectTransactionById, useGetTransactionsQuery } from '../features/transaction/transactionApiSlice';
import { selectAllBranchs, selectBranchById, useGetBranchsQuery } from '../features/branch/branchApiSlice';
import { selectAllCustomers, selectCustomerById, useGetCustomersQuery } from '../features/customer/customerApiSlice';
import { selectAllTrips, selectTripById, useGetTripsQuery } from '../features/tripSetup/tripApiSlice';
import { useEffect, useState } from 'react';
import { selectCurrentBranchId } from '../features/auth/authSlice';


const InvoiceComp = () => {

    const [trans_rep, setTransRep] = useState();
   //const track_rep = JSON.parse(localStorage.getItem("track_rep"))
   const get_branch = useSelector(selectAllBranchs)
   console.log(get_branch);
   const track_rep = useSelector(selectTrackRep)
   console.log(track_rep.send_b_id)

  // const branch_id = useSelector(selectCurrentBranchId);
//  const [get_send_branchh, setGet_send_branch] = useState({});
//   const [get_rece_branchh, setGet_rece_branch] = useState({});
//    const [get_trackingg , setGet_tracking] = useState({});
//   const [get_send_custt, setGet_send_cust] = useState({});
//   const [get_receive_custt, setGet_receive_cust] = useState({});
//   const [get_tripp, setGet_tripp] = useState({});

    
  //  let get_send_branchh, get_rece_branchh, get_trackingg, get_send_custt, get_receive_custt, get_tripp;
    
   
      
    // useEffect(() => {

    //     const get_send_branch = useSelector((state) => selectBranchById(state, track_rep.send_b_id))
    //     setGet_send_branch(get_send_branch)

    //     // console.log(get_trackingg)
    // }, [track_rep.send_b_id])
    // if(get_send_branch){
    // localStorage.setItem("get_send_branch", JSON.stringify(get_send_branch))
    //  get_send_branchh = JSON.parse(localStorage.getItem("get_send_branch"))
    // }else {
    //     get_send_branchh = JSON.parse(localStorage.getItem("get_send_branch"))
    // }
    const get_rece_branchh = get_branch.find((info) => info.id === track_rep.receive_b_id);
    console.log(get_rece_branchh)

//    useEffect(() => {

//     const get_rece_branch = useSelector((state) => selectBranchById(state, track_rep.receive_b_id))
//     setGet_rece_branch(get_rece_branch)

//     // console.log(get_trackingg)
// }, [track_rep.receive_b_id])
    // if(get_rece_branch){
    //     localStorage.setItem("get_rece_branch", JSON.stringify(get_rece_branch))
    //      get_rece_branchh = JSON.parse(localStorage.getItem("get_rece_branch"))
    //     }else {
    //         get_rece_branchh = JSON.parse(localStorage.getItem("get_rece_branch"))
    //     }

    //const get_tracking = useSelector((state) => selectTransactionById(state, track_rep.track_id))
  
    useEffect(() => {

        const get_tracking = useSelector((state) => selectTransactionById(state, track_rep.track_id))
        setGet_tracking(get_tracking)

        console.log(get_trackingg)
    }, [track_rep.track_id])
    

 

    useEffect(() => {

        const get_send_custt = useSelector((state) => selectCustomerById(state, track_rep.sender_cust_id))
        setGet_send_cust(get_send_custt)

       // console.log(get_trackingg)
    }, [track_rep.sender_cust_id])

   
    // if(get_send_cust){
    //     localStorage.setItem("get_send_cust", JSON.stringify(get_send_cust))
    //      get_send_custt = JSON.parse(localStorage.getItem("get_send_cust"))
    //     }else {
    //         get_send_custt = JSON.parse(localStorage.getItem("get_send_cust"))
    //     }


    
     useEffect(() => {

        const get_receive_custt = useSelector((state) => selectCustomerById(state, track_rep.receive_cust_id))
        setGet_receive_cust(get_receive_custt)

       // console.log(get_trackingg)
    }, [track_rep.receive_cust_id])

     
    // if(get_receive_cust){
    //     localStorage.setItem("get_receive_cust", JSON.stringify(get_receive_cust))
    //      get_receive_custt = JSON.parse(localStorage.getItem("get_receive_cust"))
    //     }else {
    //         get_receive_custt = JSON.parse(localStorage.getItem("get_receive_cust"))
    //     }


     
     useEffect(() => {

        const get_tripp = useSelector((state) => selectTripById(state, track_rep.trip_id))
        setGet_tripp(get_tripp)

       // console.log(get_trackingg)
    }, [track_rep.trip_id])
    // if(get_trip){
    //     localStorage.setItem("get_trip", JSON.stringify(get_trip))
    //      get_tripp = JSON.parse(localStorage.getItem("get_trip"))
    //     }else {
    //         get_tripp = JSON.parse(localStorage.getItem("get_trip"))
    //     }

   

 



    // return <div>{get_send_branchh.id}</div>

//   const get_branch = useSelector((state) => selectBranchById(state, getTrans.branch_id))
//   console.log("Braaanch",get_branch)

    // useEffect(() => {

    //     const get_branch = branch_info.find(branch => branch.id === getTrans.branch_id)

    //     console.log(get_branch)


    // },[getTrans])

  


    return (
        <div className="max-w-4xl mb-10">
            <header className='w-full'>
                <div className="w-full flex justify-center">
                    <img src={Logo} className="w-28 mb-4"/>
                </div>
                <div className="invoiceTop">
                    <h1 className='text-center'>INVOICE <span>{get_trackingg.tracking_number}</span></h1>{/*Invoice number goes into the span*/}
                </div>
            </header>
            <header className='text-xs flex justify-between flex-row-reverse'>
                <div className="text-right">
                    <div class="capitalize-first">{get_send_branchh.branch}</div>
                    {/* <div>455 Foggy Heights,<br /> AZ 85004, US</div> */}
                    <div>{get_send_branchh.contact}</div>
                    <div><a href="mailto:company@example.com">{get_send_branchh.email}</a></div>
                </div>
                <div>
                    <div><small className='font-bold text-gray-500 mr-2'>SENDER</small>{get_send_custt.fname} {get_send_custt.lname}</div>
                    <div><small className='font-bold text-gray-500 mr-2'>EMAIL</small> <a href="mailto:john@example.com">{get_send_custt.email}</a></div>
                    <div><small className='font-bold text-gray-500 mr-2'>DATE</small>{get_trackingg.trans_date}</div>
                    {/* <div><small className='font-bold text-gray-500 mr-2'>DUE DATE</small> September 17, 2015</div> */}
                </div>
            </header>
            <main className='text-sm mt-10'>                
                <Table hoverable striped>
                    <Table.Head>
                        <Table.HeadCell>Receiver Details</Table.HeadCell>
                        <Table.HeadCell>Tracking Number</Table.HeadCell>
                        <Table.HeadCell>Bar Code</Table.HeadCell>
                        <Table.HeadCell>Item Details</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          
                            <Table.Cell>
                                {get_receive_custt.fname} {get_receive_custt.lname}<br/>
                                {get_receive_custt.email}<br/>
                                {get_receive_custt.contact}
                            </Table.Cell>
                            <Table.Cell>{get_receive_custt.contact}</Table.Cell>
                            <Table.Cell>

                            </Table.Cell>
                            <Table.Cell>
                                weight: {get_trackingg.weight}kg
                                trip: {get_tripp.trip_name}
                                status: {get_trackingg.payment_status}
                            </Table.Cell>
                        </Table.Row>
                        {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                Jason Mraz<br/>
                                jmraz@gmail.com<br/>
                                +233 24 785 6987
                            </Table.Cell>
                            <Table.Cell>
                                Kodey Macgin<br/>
                                kodey872@gmail.com<br/>
                                +233 24 785 6987
                            </Table.Cell>
                            <Table.Cell>012554897</Table.Cell>
                            <Table.Cell>

                            </Table.Cell>
                            <Table.Cell>
                                weight: 50kg
                                trip: ACC-KMS
                                status: Paid
                            </Table.Cell>
                        </Table.Row> */}
                    </Table.Body>
                </Table>
            </main>
        </div>
    );
                    
}

export default InvoiceComp
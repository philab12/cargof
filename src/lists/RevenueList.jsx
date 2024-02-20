import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { selectCurrentBranchId, selectCurrentRole, selectCurrentToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { COURIER_STAGES, USERLEVEL } from '../otherFunc/customDataTypes';
import { selectAllTransactions } from '../features/transaction/transactionApiSlice';
import { branchApiSlice, selectAllBranchs } from '../features/branch/branchApiSlice';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput, Select } from 'flowbite-react';
import { jwtDecode } from 'jwt-decode'

import { Box,Stack,useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataGridCustomToolbar from '../components/DataGridCustomToolbar';
import {CustomFooterTotalComponent} from '../components/CustomFooterTotalComponent';
import {DataGrid} from "@mui/x-data-grid"

function RevenueList() {
    const [data, setData] = useState([])
    const [grandTotal, setGrandTotal] = useState("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const [selectionModel,setSelectionModel] = useState([]);


    const token = useSelector(selectCurrentToken)
 
    const token_info = JSON.parse(JSON.stringify(jwtDecode(token)))
    

    const user_level = useSelector(selectCurrentRole);
    const branch_id = useSelector(selectCurrentBranchId);
    const trans_all = useSelector(selectAllTransactions);
    const all_branch = useSelector(selectAllBranchs)
    const trans_branch = all_branch.filter((info) => info.is_main_branch === "NO");
   




    const formik = useFormik({
        initialValues: {
          from_date: null,
          to_date: null,
          branch_id: user_level === USERLEVEL.SUPER_ADMIN ? "" : branch_id
        },
        onSubmit: async (values, onSubmitProps) => {
           // console.log('onSubmit', values)
  
              //values.consolidated_date = format(values.consolidated_date, 'yyyy-MM-dd');
             // values.consolidated_date = new Date(values.consolidated_date);
             setLoading(true)
             setShow(true)
                 let sum;
    
             if(values.branch_id !== "ALL"){
            

            const dataArr = []
            var total = 0;
            sum = trans_all.forEach(function(item){

            const d = new Date(item.trans_date)
            const from_date = new Date(values.from_date)
            const to_date = new Date(values.to_date)
            if((d >= from_date && d <= to_date) && item.branch_id === values.branch_id){
                total += parseFloat(item.total_cost);
            }

           })

           dataArr.push({id:1,branch_name:token_info.branch_name, revenue:total.toFixed(2),from_date:values.from_date, to_date:values.to_date})

           setData(dataArr);
           setGrandTotal(total.toFixed(2))

        //    console.log(data)
           setLoading(false)

             return dataArr
             
          


            }  else {

                const dataArr = []
                let grandTotal = 0
                sum = trans_branch.forEach(function(bran){
                  var total = 0;
                  trans_all.forEach(function(item){
                    const d = new Date(item.trans_date)
                    const from_date = new Date(values.from_date)
                    const to_date = new Date(values.to_date)
                    if(d >= from_date && d<=to_date && item.branch_id === bran.id){
                        total += parseFloat(item.total_cost);
                    }
                  })
                  grandTotal += total
                  dataArr.push({id:bran.id,branch_name:bran.branch, revenue:total.toFixed(2),from_date:values.from_date, to_date:values.to_date})
               }) 

               setGrandTotal(grandTotal.toFixed(2))

               setData(dataArr);
            //    console.log(data)

               setLoading(false)

               return dataArr;
            }

       
          
  
        },
        validationSchema: Yup.object({
          from_date: Yup.string().required("From Date is required"),
          to_date: Yup.string().required("To is required"),
          branch_id: user_level === USERLEVEL.SUPER_ADMIN ? Yup.string().required("Please Select A Branch") : Yup.string().notRequired(),
       
        })
    });




    
    const columns = [

        {
            field: "revenue",
            headerName: "Revenue",
            flex:1
        },

        {
            field: "branch_name",
            headerName: "Branch",
            flex:1
        },
    
        {
            field: "from_date",
            headerName: "From Date",
            flex:1
        },
        {
            field: "to_date",
            headerName: "To Date",
            flex:1
        },
 

            
      ]
    

  


    return (
        <>

<form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      {/* <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2> */}

      <div className='flex w-full gap-5 items-center justify-normal'>
          <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="from_date" value="From Date" />
                </div>
                <TextInput 
                  id="from_date" 
                  name="from_date" 
                  type="date" 
                  placeholder="From Date" 
                  required 
                  value={formik.values.from_date} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.from_date && formik.touched.from_date && formik.errors.from_date}</div>
            </div>


            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="to_date" value="To Date" />
                </div>
                <TextInput 
                  id="to_date" 
                  name="to_date" 
                  type="date" 
                  placeholder="To Date" 
                  required 
                  value={formik.values.to_date} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.to_date && formik.touched.to_date && formik.errors.to_date}</div>
            </div>


          </div>


         {
            user_level === USERLEVEL.SUPER_ADMIN ?
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="branch_id" value="Branch" />
                </div>
                <Select 
                  id="branch_id" 
                  name="branch_id" 
                  required
                  value={formik.branch_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Choose a Type --</option>
                  <option value="ALL">ALL</option>
                  {
                      trans_branch?.map((d) => {
                          return <option value={d.id} key={d.id}>{d.branch}</option>
                      })
                  }
                </Select> 
                <div className="error">{formik.errors.branch_id && formik.touched.branch_id && formik.errors.branch_id}</div>
            </div>
          </div>
          : null
}
    
          <Button type='submit'>General Revenue</Button>
      </form>
      <div></div>

            {/* <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox id="checkAllRevenues"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>Branch</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'>
                    <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data.map((d, i) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
                                <Table.Cell className="p-4">
                                <Checkbox id={i}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    GHS {d.amount}
                                </Table.Cell>
                                <Table.Cell>{d.branch}</Table.Cell>
                                <Table.Cell>{d.date}</Table.Cell>
                                <Table.Cell className='hidden lg:table-cell'>                                    
                                    <Link to="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table> */}


{
    show &&
<Box className="bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-900 outline-none" mt="5px"  height="50vh"
      sx={{"& .MuiDataGrid-root":{
        border: "none"
      },
      "& .MuiDataGrid-cell":{
        borderBottom: "none"
      },
      "& .MuiDataGrid-columnHeaders":{
         padding: "4px",
         fontWeight:"900",
         color:"black",
         fontSize:"16px",
         borderBottom:"none"
      },
    
    }}
      >
        <DataGrid
           initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterExcludeHiddenColumns: true,
              },
            },
          }}

          
        //   columnVisibilityModel={{
        //     // branch: user_level !== USERLEVEL.SUPER_ADMIN ? false : true,
        //     action: user_level === USERLEVEL.SUPER_ADMIN ? true : false
        //   }}

          
        loading={(loading || !data)}
        getRowId={(row) => row.id}
        rows={data || []}
        columns={columns}
        // checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          console.log(newSelectionModel)
        }}
        selectionModel={selectionModel}
        slots={{
          toolbar: DataGridCustomToolbar,
          footer: CustomFooterTotalComponent

        }}
        slotProps={{
          toolbar: { selectionModel,  },
          footer: {grandTotal}
        }}



        />
        </Box>   
}
        </>
    )
}

export default RevenueList
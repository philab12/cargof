import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.access_token

        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
   // const navigate = useNavigate();

    //console.log(args) // request url, method, body
    //console.log(api) // signal, dispatch, getState()
    //console.log(extraOptions) //custom like {shout: name}
    
    let result = await baseQuery(args, api, extraOptions)

    //if you want, handle other status codes, too
    if(result?.error?.status === 401){
        console.log('sending refresh token')

        //send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshResult?.data){
            //store the new token
            api.dispatch(setCredentials({access_token:refreshResult.access_token, email:refreshResult.email, roles:refreshResult.roles}))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)

        } else {
            if(refreshResult?.error?.status === 401) {
                refreshResult.error.data.message = "Your login has expired. "
                //navigate("/login")
               // history.push('/login');
               window.location.replace("/login");

            }

            return refreshResult
        }
    }

    return result

}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['IdType','CourierType', 'CourierCategory', 'CourierStage', 'Branch', 'Trip', 'CourierPrice', 'WeightUnit', 'ExtraCharge','SecurityQuestion', 'Transaction', 'Customer', 'User', 'ConsolidatedPackage'],
    endpoints: builder => ({})
})
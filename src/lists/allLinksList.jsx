import { Sidebar } from 'flowbite-react';
import { LuSettings2 } from "react-icons/lu";
import { HiCash, HiChartPie } from 'react-icons/hi';
import { FaBoxesPacking, FaUsers, FaUserGroup, FaTicket, FaClipboardList, FaBuilding, FaPeopleGroup } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { selectCurrentToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { USERLEVEL } from '../otherFunc/customDataTypes';


const navItems = [
    {link: "Dashboard", path: "/dashboard", key: "1", linkIcon: <HiChartPie className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.SUPERVISOR, USERLEVEL.STAFF]},
    {link: "Branches", path: "/branches", key: "2", linkIcon: <FaBuilding className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
    {link: "Customers", path: "/customers", key: "3", linkIcon: <FaPeopleGroup className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
    {link: "Revenue", path: "/revenue", key: "4", linkIcon: <HiCash className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER]},
    {link: "Courier", path: "/courier", key: "5", linkIcon: FaBoxesPacking, subLinks: [
      ["Pending Transaction", "/pendingTrans", "5a"],
        // ["All Courier", "/courier", "5b"],
        ["In Queue Courier", "/in-queue-courier", "5b"],
        ["Dispatched Courier", "/dispatched-courier", "5c"],
        ["Consolidate Package", "/consolidated-packages", "5d"],
        ["Inbound Courier", "/inbound-courier", "5e"],
        ["Received Courier", "/recieved-courier", "5f"],
        ["Collected Courier", "/collected-courier", "5g"],
    ], roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
    // {link: "Staff", path: "/staff", key: "6", linkIcon: <FaUsers className='sideBarLinkIcon'/>, subLinks: ""},
    {link: "End Users", path: "/users", key: "7", linkIcon: <FaUserGroup className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN]},
    // {link: "Support Tickets", path: "/tickets", key: "8", linkIcon: <FaTicket className='sideBarLinkIcon'/>, subLinks: ""},
    // {link: "User Logs", path: "/logs", key: "9", linkIcon: <FaClipboardList className='sideBarLinkIcon'/>, subLinks: ""},
    {link: "Setups", path: "/courier", key: "10", roles:[USERLEVEL.SUPER_ADMIN], linkIcon: LuSettings2, subLinks: [
      ["Trips", "/trips", "10a"],,
      ["Courier Types", "/courier-types", "10b"],
      ["Courier Categories", "/courier-categories", "10c"],
      // ["Courier Stages", "/courier-stages", "10d"],
      ["Courier Pricing", "/courier-pricing", "10d"],
      ["Extra Charge", "/extra-charge", "10e"],
      ["Weight Units", "/weight-units", "10f"],
      ["Id Types", "/id-types", "10g"],
      ["Security Questions", "/security-questions", "10h"],

  ]},

];

export function SidebarList(){ 

  
  const token = useSelector(selectCurrentToken)
 
  const token_info = JSON.parse(JSON.stringify(jwtDecode(token)))

  console.log(token_info)

    return (
        <>
        {
        navItems.map(
            ({link, path, key, linkIcon, subLinks, roles}) =>  subLinks == "" ? 
            (
              roles.includes(token_info.roles) ?
          <NavLink to={path} key={key} className='sideBarLink'>
            {linkIcon}
            <div className='sideBarLinkName'>{link}</div>
          </NavLink> : null )  : 
          
            roles.includes(token_info.roles) &&
          <Sidebar.Collapse icon={linkIcon} label={link} key={key}>
            {subLinks.map((subLink) => (
              <NavLink className='sideBarSubLink' to={subLink[1]} key={subLink[2]}>{subLink[0]}</NavLink >
            )
          )}
          </Sidebar.Collapse>) 

        
        }
        </>
    )
}

export function NavList(){
    return (
        <>
        {
        navItems.map(
            ({link, path, key}) => 
            <NavLink to={path} key={key} className='NavLink'>
            {link}
            </NavLink>
          )
        }
        </>
    )
}


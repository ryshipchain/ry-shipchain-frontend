import { useNavigate } from "react-router-dom";



const DashboardPage = () => {
  
  const dataRedirect = useNavigate();

  const signOut = () => {
    localStorage.removeItem('token');
    dataRedirect('/');
  }

  return (
    <>
      <div>Dashboard</div>
      <button type="button" onClick={()=>signOut()}>logout</button>
    </>
    
  )
}

export default DashboardPage
import "./App.scss";
import ConcursDetailsContainer from "../ConcursDetails/ConcursDetailsContainer";
import Header from "../Header/Header";
import { Container } from "@mui/material";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import MyConcurs from "../myConcurs/myConcurs";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import AllSubcriptions from "../AllSubcriptions/AllSubcriptions";
import Channel from "../Channel/Channel";
import TestPages from "../testPages/testPages";
import ConcursShareWinners from "../ConcursShareWinners/ConcursShareWinners";
import ConcursShare from "../ConcursShare/ConcursShare";
import ConcursShareUser from "../ConcursShareUser/ConcursShareUser";
import MyChannel from "../MyChannel/MyChannel";
import Login from "../Login/Login";
import User from "../SignIn/SignInComponents/User";
import ChannelForm from "../SignIn/SignInComponents/Channel";
import Signin from "../SignIn/Signin";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import CreateComponent from "../MyChannel/create/Create";
import MainConcurs from "../MyChannel/create/pages/main";
import DescriptionConcurs from "../MyChannel/create/pages/description";
import Prizes from "../MyChannel/create/pages/prizes";
import ConditionsConcurs from "../MyChannel/create/pages/conditions";
import ResultConcurs from "../MyChannel/create/pages/result";
import UpdateConcurs from "../MyChannel/update/Update";
import ProtectedRoute from "../../Components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import Confirm from "../SignIn/SignInComponents/Confirm";
import Logout from "../../Components/Logout/Logout";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";
import MainUpdateConcurs from "../MyChannel/update/pages/main";
import DescriptionUpdateConcurs from "../MyChannel/update/pages/description";
import PrizesConcursUpdate from "../MyChannel/update/pages/prizes";
import ConditionsUpdateConcurs from "../MyChannel/update/pages/conditions";
import EmptySub from "../AllSubcriptions/emptySub/emptySub";

const App = () => {
  const { Authstore } = useContext(Context);

  if(Authstore.isLoading){
    return <LoadingCustom/>
  }

  return (
    <div>
      <Header />
      <Container
        style={{ maxWidth: "1110px", padding: "0 10px", margin: "0 auto" }}
      >
        <Routes>
          <Route element={<ProtectedRoute user={Authstore.isAuth} redirectPath="/login" />}>
            <Route path="/" element={<HomePage/>} />
              <Route path="/concurs/:id" element={<ConcursDetailsContainer />} />
              <Route path="/profileInfoChannel/*" element={<ProfileSettings />} />
              <Route path="concurs-share/:id" element={<ConcursShare/>}/>
              <Route path="concurs-user/*" element={<ConcursShareUser />}/>
              <Route path="concurs-winner/:id" element={<ConcursShareWinners />}/>
              <Route path="/mychannel" element={<MyChannel />} />
              <Route path="/myconcurs" element={<MyConcurs />} />

              <Route path="/allSubcription/*" element={<AllSubcriptions />} >
                <Route index element={<EmptySub />} />
                <Route path=":id" element={<Channel/>}/>
              </Route>

              <Route path="/channel/:id" element={<Channel />} />
              <Route path="/mychannel/create/*" element={<CreateComponent />}>
              <Route path="main" element={<MainConcurs />} />
              <Route path="description" element={<DescriptionConcurs />} />
              <Route path="prizes" element={<Prizes />} />
              <Route path="conditions" element={<ConditionsConcurs />} />
              <Route path="result" element={<ResultConcurs />} />
            </Route>
            <Route path="/mychannel/update/:id/*" element={<UpdateConcurs />}>
              <Route path="main" element={<MainUpdateConcurs />} />
              <Route path="description" element={<DescriptionUpdateConcurs />} />
              <Route path="prizes" element={<PrizesConcursUpdate />} />
              <Route path="condition" element={<ConditionsUpdateConcurs />} />
            </Route>
            <Route path="/logout" element={<Logout/>}/>
          </Route>

          <Route element={<ProtectedRoute user={!Authstore.isAuth} redirectPath="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signin/*" element={<Signin />}>
              <Route path="user" element={<User />} />
              <Route path="channel" element={<ChannelForm />} />
              <Route path="confirm" element={<Confirm />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/test/*" element={<TestPages />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default observer(App);

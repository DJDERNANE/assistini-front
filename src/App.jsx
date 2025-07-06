/** @format */

import React, { useEffect, useState } from "react";
import {
    Route,
    Routes,
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchMedecinPage from "./pages/SearchMedecinPage";
import DetailsMedecinPage from "./pages/DetailsMedecinPage";
import ScrollToTop from "./layout/ScrollToTop";
import WelcomePage from "./pages/WelcomePage";
import PopUpAlert from "./components/ui/PopUpAlert";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import MakeRdvPage from "./pages/MakeRdvPage";
import RDVPage from "./pages/RDVPage";
import NotificationPage from "./pages/NotificationPage";
import MessagePage from "./pages/MessagePage";
import DashboardPage from "./pages/DashboardPage";
import { useGetAll } from "./hooks/useSamples";
import categoryService from "./services/categoryService";
import WaitingListPage from "./pages/provider/WaitingListPage";
import DashboardProviderPage from "./pages/provider/DashboardProviderPage";
import PatientProfile from "./pages/provider/PatientProfile";
import WaitingListDetailPage from "./pages/provider/WaitingListDetailPage";
import NewPatient from "./pages/provider/NewPatient";
import ExistPatient from "./pages/provider/ExistPatient";
import SettingsPage from "./pages/provider/Settings/SettingsPage";
import FacturePage from "./pages/provider/Facture/Facture";
import FactureListPage from "./pages/provider/Facture/List";
import FactureDetailPage from "./pages/provider/Facture/Detail";
import AdminPage from "./pages/provider/Settings/AdminPage";
import AccountPage from "./pages/provider/Settings/AccountPage";
import ServicePage from "./pages/provider/Settings/ServicePage";
import MyTeam from "./pages/provider/MyTeam/MyTeam";
import MyNotes from "./pages/provider/MyNotes/MyNotes";
import MyTeamList from "./pages/provider/MyTeam/MyTeamList";
import ListRdvs from "./pages/provider/RDV/Rdvs";
import List from "./pages/provider/RDV/List";
import Rdvs from "./pages/provider/RDV/Rdvs";
import Service from "./pages/provider/RDV/Service";
import Stats from "./pages/provider/Stat/Stats";
import MyCalendar from "./pages/provider/Callendar/List";
import NotFoundPage from "./pages/NotFoundPage";
import { useMe } from "./hooks/useAuthService";
import MyRDVPage from "./pages/MyRDVPage";
import FavoritePage from "./pages/FavoritePage";
import DocumentPage from "./pages/DocumentPage";
import MyNotePage from "./pages/MyNotePage";
import MyPatientPage from "./pages/MyPatientPage";
import PatientDetailPage from "./pages/PatientDetailPage";
import ProfilePage from "./pages/ProfilePage";
import Chat from "./pages/provider/Chat/Chat";
import ListChat from "./pages/provider/Chat/ListChat";
import ProtectedRoute from "./layout/ProtectRoutes";
import CabinetPage from "./pages/provider/Settings/CabinetPage";
import WelcomePrestateurPage from "./pages/WelcomePrestateurPage";
import AddRdv from "./pages/provider/RDV/AddRdv";
import SubPrestateurPage from "./pages/SubPrestateurPage";
import AddDocumentPage from "./pages/AddDocumentPage";
import RequestPage from "./pages/RequestsPage";
import RequestPrestateurPage from "./pages/RequestPrestateurPage";
import PatientSignPage from "./pages/PatientSignPage";
import AuthRoute from "./components/middlware/AuthRoute";
import GuestRoute from "./components/middlware/GuestRoute";
import RoleRoute from "./components/middlware/RoleRoute";

function App() {
    const { t } = useTranslation("popup");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const { mePrestateur } = useMe();

    // const path = window.location.pathname;
    // const paths = path.split("/");
    // const endPath = paths[paths.length - 1];

    // const navigate = useNavigate();

    // useEffect(() => {
    //   const token = localStorage.getItem("accessToken");
    //   if (token && endPath === "/") {
    //     navigate("/prestateur/rdvs");
    //   }
    // }, [endPath]);

    const alert = useSelector((state) => state.alert.item);
    useEffect(() => {
        // mePrestateur();

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (alert) onOpen();
    }, [alert]);

    return (
        <div className="h-screen">
            {loading ? (
                <div className="w-full flex items-center justify-center h-screen">
                    <CircularProgress isIndeterminate color="blue.400" />
                </div>
            ) : (
                <Router>
                    {/* <ScrollToTop /> */}

                    <Routes>
                        {/* Guest routes */}
                        <Route exact path="/" element={
                            <GuestRoute>
                                <WelcomePage />
                            </GuestRoute>
                        } />
                        <Route
                            exact
                            path="/sign"
                            element={
                                <GuestRoute>
                                    <PatientSignPage />
                                </GuestRoute>
                            }
                        />
                        <Route
                            exact
                            path="/sign-prestateur"
                            element={
                                <GuestRoute>
                                    <WelcomePrestateurPage />
                                </GuestRoute>
                            }
                        />
                        <Route
                            exact
                            path="/request-prestateur"
                            element={
                                <GuestRoute>
                                    <RequestPrestateurPage />
                                </GuestRoute>
                            }
                        />
                        <Route
                            exact
                            path="/sub-prestateur"
                            element={
                                <GuestRoute>
                                    <SubPrestateurPage />
                                </GuestRoute>
                            }
                        />
                        
                        {/* Provider dashboard (prestateur) */}
                        <Route
                            exact
                            path="prestateur"   
                            element={
                                <RoleRoute allowedRoles={["prestateur"]}>
                                    <DashboardProviderPage />
                                </RoleRoute>
                            }
                        >
                            <Route
                                exact
                                path="waiting-list"
                                element={<WaitingListPage />}
                            >
                                <Route
                                    exact
                                    path="requests"
                                    element={<WaitingListDetailPage />}
                                />
                            </Route>
                            <Route
                                exact
                                path="patient-profile"
                                element={<PatientProfile />}
                            >
                                <Route
                                    exact
                                    path="add"
                                    element={<NewPatient />}
                                />
                                <Route
                                    exact
                                    path="exist"
                                    element={<ExistPatient />}
                                />
                            </Route>
                            <Route
                                exact
                                path="settings"
                                element={<SettingsPage />}
                            >
                                <Route
                                    exact
                                    path="admin"
                                    element={<AdminPage />}
                                />
                                <Route
                                    exact
                                    path="accounts"
                                    element={<AccountPage />}
                                />
                                <Route
                                    exact
                                    path="my-clinic"
                                    element={<ServicePage />}
                                />
                                <Route
                                    exact
                                    path="my-cabinet"
                                    element={<CabinetPage />}
                                />
                            </Route>
                            <Route
                                exact
                                path="invoices"
                                element={<FacturePage />}
                            >
                                {/* <Route exact index element={<FactureListPage />} /> */}
                                <Route
                                    exact
                                    path=":type"
                                    element={<FactureListPage />}
                                />
                                <Route
                                    exact
                                    path=":type/:id"
                                    element={<FactureDetailPage />}
                                />
                            </Route>
                            <Route exact path="my-calendar">
                                <Route
                                    exact
                                    index
                                    element={<MyCalendar />}
                                />
                            </Route>
                            <Route exact path="my-team">
                                <Route exact index element={<MyTeam />} />
                                <Route
                                    exact
                                    path="list"
                                    element={<MyTeamList />}
                                />
                                <Route
                                    exact
                                    path="my-notes"
                                    element={<MyNotes />}
                                />
                            </Route>
                            <Route exact path="rdvs" element={<Rdvs />}>
                                <Route exact index element={<List />} />
                                <Route
                                    exact
                                    path="add"
                                    element={<AddRdv />}
                                />
                                <Route
                                    exact
                                    path="service/:id"
                                    element={<Service />}
                                />
                                {/* <Route exact path="my-notes" element={<MyNotes />} /> */}
                            </Route>
                            <Route exact path="chat" element={<Chat />}>
                                <Route exact index element={<ListChat />} />
                            </Route>
                            <Route exact path="stats" element={<Stats />} />
                        </Route>
                        
                        {/* Patient dashboard */}
                        <Route
                            exact
                            path="home"
                            element={
                                <RoleRoute allowedRoles={["patient"]}>
                                    <DashboardPage />
                                </RoleRoute>
                            }
                        >
                            <Route exact index element={<HomePage />} />
                            <Route
                                exact
                                path="messages"
                                element={<MessagePage />}
                            />
                            <Route
                                exact
                                path="favorites"
                                element={<FavoritePage />}
                            />
                            <Route
                                exact
                                path="my-rdvs"
                                element={<MyRDVPage />}
                            />
                            <Route
                                exact
                                path="documents"
                                element={<DocumentPage />}
                            />
                            <Route
                                exact
                                path="documents/add"
                                element={<AddDocumentPage />}
                            />
                            <Route
                                exact
                                path="requests"
                                element={<RequestPage />}
                            />

                            {/* <Route exact path="my-notes" element={<MyNotePage />} /> */}
                            <Route
                                exact
                                path="add-patient"
                                element={<PatientDetailPage />}
                            />
                            <Route
                                exact
                                path="my-patient/:id"
                                element={<PatientDetailPage show />}
                            />
                            <Route
                                exact
                                path="my-patient"
                                element={<MyPatientPage />}
                            />
                            <Route
                                exact
                                path="profile"
                                element={<ProfilePage />}
                            />
                            <Route
                                exact
                                path="notifications"
                                element={<NotificationPage />}
                            />
                        </Route>
                        
                        {/* Auth-protected routes for both roles */}
                        <Route exact path="make-rdv" element={
                            <AuthRoute>
                                <RDVPage />
                            </AuthRoute>
                        }>
                            <Route index element={<MakeRdvPage />} />
                        </Route>
                        
                        <Route exact path="doctors">
                            <Route index element={<SearchMedecinPage />} />
                            <Route
                                exact
                                path=":id"
                                element={<DetailsMedecinPage />}
                            />
                        </Route>
                        
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Router>
            )}
            
            <PopUpAlert isOpen={isOpen} onClose={onClose} size={"4xl"}>
                <p className="text-center">
                    {t("detail-doctor.validation-description")}
                </p>
                <p className="text-center p-5 mt-4 bg-[#DBE6FF]">
                    {t("detail-doctor.validation-indice")}
                </p>
            </PopUpAlert>
        </div>
    );
}

export default App;

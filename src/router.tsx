import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import UserProfileView from "./views/profile/UserProfileView";
import CreateRecipe from "./views/profile/CreateRecipe";
import UserEditProfile from "./views/profile/UserEditProfile";
import HomeLayout from "./layouts/HomeLayout";
import RecipeInfo from "./views/RecipeInfo";
import HomeView from "./views/home/HomeView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
        <Route path="/admin" element={<ProfileLayout />}>
          <Route path=":userId" element={<UserProfileView />} />
          <Route path="create-recipe" element={<CreateRecipe />} />
          <Route path="edit-profile" element={<UserEditProfile />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/home" element={<HomeView />} />
          <Route path="/recipe/" element={<RecipeInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

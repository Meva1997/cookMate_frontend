import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import UserProfileView from "./views/profile/UserProfileView";
import CreateRecipe from "./views/profile/CreateRecipe";
import UserEditProfile from "./views/profile/UserEditProfile";
import HomeLayout from "./layouts/HomeLayout";
import RecipeInfo from "./views/recipe/RecipeInfo";
import HomeView from "./views/home/HomeView";
import EditRecipeInfo from "./views/profile/EditRecipeInfo";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
        <Route path="/admin" element={<ProfileLayout />}>
          <Route path="create-recipe/:userId" element={<CreateRecipe />} />
          <Route path=":userId" element={<UserProfileView />} />
          <Route path=":userId/edit" element={<UserEditProfile />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/home" element={<HomeView />} />
          <Route
            path="/user/:userId/recipe/:recipeId"
            element={<RecipeInfo />}
          />
          <Route
            path="/user/:userId/recipe/:recipeId/edit"
            element={<EditRecipeInfo />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

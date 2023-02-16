import { Icon } from '@rneui/themed';
import {
    Chat,
    CreatePostPage,
    EditProfile,
    EditUser,
    FriendProfile,
    Home,
    ListFriends,
    Loading,
    Login,
    Logout,
    Profile,
    Register,
} from '../screens';
import ActivateAccount from '../screens/auth/pages/ActivateAccount';
import ChatDetail from '../screens/chat/pages/ChatDetail';
import ChatPersonal from '../screens/chat/pages/ChatPersonal';
import EditPostPage from '../screens/home/pages/EditPostPage';
import NotificationPage from '../screens/notification/pages/NotificationPage';
import PostDetailPage from '../screens/post-detail/pages/PostDetailPage';
import SearchPage from '../screens/search/pages/SearchPage';
import SettingPage from '../screens/settings/pages/SettingPage';
import { PageName } from './constants';
import TabNavigator from './TabNavigator';

export const routes = [
    {
        name: PageName.LOADING,
        component: Loading,
        headerShown: false,
    },
    {
        name: PageName.TAB_NAVIGATOR,
        component: TabNavigator,
        headerShown: false,
    },
    {
        name: PageName.LOGIN,
        component: Login,
        headerShown: false,
    },
    {
        name: PageName.LOGOUT,
        component: Logout,
        headerShown: false,
    },
    {
        name: PageName.REGISTER,
        component: Register,
        headerShown: false,
    },
    {
        name: PageName.ACTIVATE_ACCOUNT_PAGE,
        component: ActivateAccount,
        headerShown: false,
    },
    {
        name: PageName.HOME,
        component: Home,
        headerShown: false,
    },
    {
        name: PageName.CHAT,
        component: Chat,
        headerShown: false,
    },
    {
        name: PageName.PROFILE,
        component: Profile,
        headerShown: false,
    },
    {
        name: PageName.FRIEND_PROFILE,
        component: FriendProfile,
        headerShown: true,
    },
    {
        name: PageName.LIST_FRIENDS,
        component: ListFriends,
        headerShown: true,
    },
    {
        name: PageName.EDIT_PROFILE,
        component: EditProfile,
        headerShown: true,
    },
    {
        name: PageName.EDIT_USER,
        component: EditUser,
        headerShown: true,
    },
    {
        name: PageName.CREATE_POST_PAGE,
        component: CreatePostPage,
        headerShown: true,
    },
    {
        name: PageName.CHAT_DETAIL,
        component: ChatDetail,
        headerShown: true,
    },
    {
        name: PageName.CHAT_PERSONAL,
        component: ChatPersonal,
        headerShown: true,
    },
    {
        name: PageName.POST_DETAIL_PAGE,
        component: PostDetailPage,
        headerShown: true,
    },
    {
        name: PageName.EDIT_POST_PAGE,
        component: EditPostPage,
        headerShown: true,
    },
    {
        name: PageName.SEARCH_PAGE,
        component: SearchPage,
        headerShown: true,
    },
    {
        name: PageName.NOTIFICATION_PAGE,
        component: NotificationPage,
        headerShown: false,
    },
    {
        name: PageName.SETTING_PAGE,
        component: SettingPage,
        headerShown: false,
    },
];

export const tabNavigatorRoutes = [
    {
        name: PageName.HOME,
        component: Home,
        icon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
        ),
    },
    {
        name: PageName.PROFILE,
        component: Profile,
        icon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
        ),
    },
    {
        name: PageName.NOTIFICATION_PAGE,
        component: NotificationPage,
        icon: ({ color, size }) => (
            <Icon name="public" color={color} size={size} />
        ),
    },
    {
        name: PageName.SEARCH_PAGE,
        component: SearchPage,
        icon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
        ),
    },
    {
        name: PageName.SETTING_PAGE,
        component: SettingPage,
        icon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
        ),
    }
];

import {getUnique} from "utils";
import {UsersService} from 'services';
import {FriendshipsService} from "services";

const initialState = {
  user: undefined,
  followers: [],
  follows: [],
};

export const users = {
  state: initialState,
  reducers: {
    setUser(state, user) {

      if (user.hasOwnProperty('__meta__')) {
        Object.keys(user.__meta__).forEach(key =>
          user[key] = user.__meta__[key]
        );
        delete user.__meta__;
      }

      user.private = !!user.private;

      return {
        ...state,
        user,
        follows: [],
        followers: []
      };
    },
    decrementsPostsCount(state) {
      const user = {...state.user};
      user.posts_count--;

      return {
        ...state,
        user
      }
    },
    incrementsPostsCount(state) {
      const user = {...state.user};
      user.posts_count++;

      return {
        ...state,
        user
      }
    },
    addFollowers(state, followers) {
      return {
        ...state,
        followers: getUnique([...state.followers, ...followers])
      }
    },

    addFollows(state, follows) {
      return {
        ...state,
        follows: getUnique([...state.follows, ...follows])
      }
    },

    setFollowers(state, followers) {
      return {
        ...state,
        followers
      }
    },

    setFollows(state, follows) {
      return {
        ...state,
        follows
      }
    },

    follow(state) {
      let user = {...state.user};
      user.friendshipState = user.private ? 1 : 2;

      if (!user.private)
        user.followers_count++;

      return {
        ...state,
        user
      };
    },

    unfollow(state) {
      let user = {...state.user};

      if (user.friendshipState !== 1)
        user.followers_count--;

      user.friendshipState = 0;

      return {
        ...state,
        user
      };
    },

    changeSeeState(state, canSee) {
      let user = {...state.user};

      user.canSee = canSee;

      return {
        ...state,
        user
      };
    },

    removeFromFollows(state, id) {
      return {
        ...state,
        follows: state.follows.filter(user => user.id !== id)
      };
    },

    updateAvatar(state, avatar) {
      state = {
        ...state,
        user: {
          ...state.user,
          avatar
        }
      };

      return state;
    },

    deleteAvatar(state) {
      return {
        ...state,
        user: {
          ...state.user,
          avatar: null
        }
      };
    },

    setPrivate(state) {
      return {
        ...state,
        user: {
          ...state.user,
          private: true
        }
      };
    },

    setPublic(state) {
      return {
        ...state,
        user: {
          ...state.user,
          private: false
        }
      };
    },

    setBlacklisted(state) {
      let user = {...state.user};
      user.blacklisted = true;

      return {
        ...state,
        user
      }
    },

    setUnblacklisted(state) {
      let updatedUser = {...state.user};
      updatedUser.blacklisted = false;

      return {
        ...state,
        user: updatedUser
      }
    },

    removeFollower(state, id) {
      return {
        ...state,
        user: {
          ...state.user,
          followers_count: state.user.followers_count - 1
        },
        followers: state.followers.filter(user => user.id !== id),
      }
    },
    reset() {
      return initialState;
    }
  },
  effects: (dispatch) => ({
    async getUser(username) {
      const data = await UsersService.getUser(username);
      data.data && dispatch.users.setUser(data.data);
      return data;
    },
    async followAsync(data) {
      dispatch.users.follow();
      await FriendshipsService.follow(data);
    },
    async unfollowAsync(data) {
      dispatch.users.removeFromFollows(data.id);
      dispatch.users.unfollow();
      const receivedData = await FriendshipsService.unfollow(data);
      dispatch.users.changeSeeState(receivedData.data.canSee);
    },
    async setPrivateAsync() {
      const {data} = await UsersService.setPrivate();
      dispatch.users.setPrivate();
      return data.message;
    },
    async setPublicAsync() {
      const {data} = await UsersService.setPublic();
      dispatch.users.setPublic();
      return data.message;
    },
    async updateAvatarAsync(avatar) {
      const {data} = await UsersService.updateAvatar(avatar);
      dispatch.users.updateAvatar(data.avatar);
      dispatch.auth.updateAvatar(data.avatar);
      return data;
    },
    async deleteAvatarAsync() {
      dispatch.users.deleteAvatar();
      await UsersService.deleteAvatar();
    },
    async removeFollowerAsync(id) {
      dispatch.users.removeFollower(id);
      await FriendshipsService.removeFollower(id);
    }
  })
};

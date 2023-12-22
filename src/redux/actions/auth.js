import * as types from './types';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';

export const userLogin = (
  link,
  formdata,
  onSuccessLogin,
  onErrorLogin,
  data,
) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/${link}.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            ShowSnackBar('Login SuccessFull...', 'green');
            dispatch(savedata(result.data.user));
            onSuccessLogin('BottomTab', data);
          } else {
            onSuccessLogin('Auth', data);
          }
        });
    } catch (err) {
      onErrorLogin(err);
    }
  };
};
export const userLoginMail = (formdata, onSuccessLogin, onErrorLogin) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/login.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            ShowSnackBar('Login SuccessFull...', 'green');
            dispatch(savedata(result.data.user));
            onSuccessLogin('BottomTab');
          } else {
            onSuccessLogin('Auth', data);
          }
        });
    } catch (err) {
      onErrorLogin(err);
    }
  };
};

export const userRegistration = (
  formdata,
  onSuccessRegistration,
  onErrorRegistration,
) => {
  return async dispatch => {
    try {
      console.log(formdata);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/register_user.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result');
          console.log(result);
          if (result.state === 'OK') {
            ShowSnackBar('Login SuccessFull...', 'green');
            dispatch(savedata(result.data.user));
            onSuccessRegistration('BottomTab');
          } else {
            onErrorRegistration(result);
          }
        })
        .catch(error => {
          console.log(error);
          onErrorRegistration(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onErrorRegistration(err);
    }
  };
};

export const userGetProfile = (formdata, onSuccessProfile, onErrorProfile) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_user_profile.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccessProfile(result.data.user);
          } else {
            onErrorProfile(result);
          }
        })
        .catch(error => {
          console.log(error);
          onErrorProfile(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onErrorProfile(err);
    }
  };
};

export const userUpdateProfile = (
  formdata,
  myHeaders,
  onSuccessUpdate,
  onErrorUpdate,
) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/update_user_profile.php`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            // onSuccessUpdate(result.data.user);
          } else {
            onErrorUpdate(result);
          }
        })
        .catch(error => {
          console.log(error);
          onErrorUpdate(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onErrorUpdate(err);
    }
  };
};

export const getHomeScreen = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_profiles.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          console.log('HomeData.....');
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data.all_users);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const toadysMatch = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/today_matches.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          console.log('result');
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data.all_liking);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const recentMatches = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/recently_viewed.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          console.log('result');
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data.recent_viewed);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const checkLikeSubscribtion = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `${types.BASE_URL}/check_user_like_subscription.php`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const checkPremiumSubscribtion = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/check_user_subscription.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const likeProfile = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/like_profile.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const passProfile = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/pass_profile.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const unHideProfile = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/unhide_profile_details.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const checkProfileLike = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/check_profile_like.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const checkProfilePass = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/check_profile_pass.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const checkHide = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/check_hide_unhide.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getLikedProfiles = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/fetch_liked_users.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getPassedProfiles = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/fetch_passed_users.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getWhoLikedProfiles = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/fetch_liking_users.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getPremiumPakages = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_packages.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getLikePakages = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_like_packages.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getAcceptedRequests = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_accepted_requests.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getConversation = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_conversations.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getMessages = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_conversation.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const sendMessages = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/send_message.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const getKeys = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/get_stripe_keys.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const premiumSuccess = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/subscribe_to_package.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};

export const like_premiumSuccess = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/subscribe_to_like_package.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result.data);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
          onError(error);
        });
    } catch (err) {
      console.log('fuck .......');
      onError(err);
    }
  };
};
export const updateToken = formdata => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASE_URL}/update_token.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result');
          console.log(result);
        })
        .catch(error => {
          console.log('fuck catch andar wala/....');
          console.log(error);
        });
    } catch (err) {
      console.log('fuck .......');
    }
  };
};
//helping APIs

export const callapi = data => {
  return {
    type: types.CALL_API,
    payload: data,
  };
};

export const stopapi = () => {
  return {
    type: types.STOP_API,
  };
};

export const handleLogOut = () => {
  return {
    type: types.LOGOUT,
  };
};

export const savedata = data => {
  return {
    type: types.SAVE_USER_DATA,
    payload: data,
  };
};

export const likeSubs = data => {
  return {
    type: types.LIKE_SUBS,
    payload: data,
  };
};

export const premiumSub = data => {
  return {
    type: types.PREMIUM_SUBS,
    payload: data,
  };
};

export const saveToken = data => {
  return {
    type: types.SAVE_TOKEN,
    payload: data,
  };
};

export const setFilters = data => {
  return {
    type: types.SET_FILTERS,
    payload: data,
  };
};

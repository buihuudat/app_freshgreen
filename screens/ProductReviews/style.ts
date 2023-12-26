import {StyleSheet} from 'react-native';
import {
  lightGreen,
  mainColor,
  secColor,
  thirColor,
} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
  },

  rateView: {
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 10,
    gap: 10,
    justifyContent: 'space-between',
  },

  rateStar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  rateAvgBox: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColor,
    borderRadius: 5,
    width: 100,
    height: 100,
  },
  rateAvgText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
  rateAvgSub: {
    fontWeight: '600',
    color: 'white',
  },

  viewRateCount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewRateCountText: {
    width: 80,
  },

  commnents: {
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  commentTitle: {
    fontSize: 23,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 10,
  },

  userView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  userAvatar: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 50,
  },

  viewComment: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  nameOfUser: {
    fontSize: 20,
    fontWeight: '600',
    width: '55%',
  },

  userRate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  rate: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  formInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 3,
    borderColor: lightGreen,
    borderRadius: 20,
    paddingHorizontal: 3,
  },
  input: {
    width: '70%',
  },

  listComments: {
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
  },

  userLike: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '77%',
  },

  recommends: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  textRecommend: {
    fontSize: 12,
    color: mainColor,
    paddingHorizontal: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: mainColor,
  },

  formReqLogin: {
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
  },

  formText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },

  formBtns: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formBtnLogin: {
    width: '40%',
    padding: 10,
    backgroundColor: thirColor,
    borderRadius: 5,
  },
  formBtnRegister: {
    width: '40%',
    padding: 10,
    backgroundColor: secColor,
    borderRadius: 5,
  },
  formBtnText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});

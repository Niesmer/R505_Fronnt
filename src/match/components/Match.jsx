import { useContext } from 'react';
import RootStore from '../../RootStore';
import CurrentUserManager from '../model/CurrentUserManager';
import MatchManager from '../model/MatchManager';

function MatchView() {
  const { matchManager, CurrentUserManager } = useContext(RootStore);
  const match = matchManager.match;

  if (match.isPlaying()) {
    if (CurrentUserManager.isDrawer()) {
      return <PlayingDrawerMatch></PlayingDrawerMatch>;
    }
    else {
      return <PlayingGuesserMatch></PlayingGuesserMatch>;
    }
  }
  if (match.isTurnDone) {
    return <MatchTurnDone></MatchTurnDone>;
  }
}
export default MatchView;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import GameForm from '../../../components/game/forms/GameForm';
import { getSingleGame } from '../../../utils/data/gameData';

export default function EditSingleGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
    // console.warn(editGame);
  }, [id]);

  return (
    <GameForm user={user} obj={editGame} />
  );
}

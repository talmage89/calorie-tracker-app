import { For, createEffect, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { user } from '~/features/auth/services/UserService';
import { Button, Container } from '~/ui';
import { DayModel, EntryModel } from '../../api';
import { Day } from '../../types';
import { AddEntryModal } from '../..';
import './Home.scss';

export function Home() {
  const [day, setDay] = createSignal<Day>();
  const [entryModalOpen, setEntryModalOpen] = createSignal(false);

  const navigate = useNavigate();

  createEffect(() => {
    if (!user()?.profile) {
      navigate('/profile');
      return;
    }
    getDay();
  });

  const getDay = () => {
    DayModel.listAction('today', 'get').then((res) => setDay(res.data));
  };

  function getNutritionInfo(argument: 'calories' | 'protein' | 'carbs' | 'fat') {
    if (!day() || !argument) return 0;
    return day()?.entries.reduce((acc, entry) => {
      return acc + entry.food[argument] * entry.quantity;
    }, 0);
  }

  return (
    <Container class="Home">
      <div class="Home__authed">
        <h2>Today's progress</h2>
        <p>Calories: {getNutritionInfo('calories')}</p>
        <p>Protein: {getNutritionInfo('protein')}g</p>
        <p>Carbs: {getNutritionInfo('carbs')}g</p>
        <p>Fat: {getNutritionInfo('fat')}g</p>

        <ul>
          <For each={day()?.entries}>
            {(entry) => (
              <li>
                {entry.food.name} - {entry.quantity}
              </li>
            )}
          </For>
        </ul>
        <Button variant="outlined" onClick={() => setEntryModalOpen(true)}>
          Add an entry
        </Button>
        <AddEntryModal
          isOpen={entryModalOpen()}
          onClose={() => setEntryModalOpen(false)}
          onSubmit={(data) => {
            EntryModel.create({ ...data, food: parseInt(data.food), day: day()?.id }).then(() => {
              getDay();
              setEntryModalOpen(false);
            });
          }}
        />
      </div>
    </Container>
  );
}

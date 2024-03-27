import { For, Show, createEffect, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { user } from '~/features/auth/services/UserService';
import { Button, Container } from '~/ui';
import { DayModel, EntryModel } from '../../api';
import { Day } from '../../types';
import { AddEntryModal, ProgressRing } from '../..';
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
    DayModel.listAction('today', 'get').then((res) => {
      setDay(res.data);
    });
  };

  const getNutritionInfo = (argument: 'calories' | 'protein' | 'carbs' | 'fat', day: Day | undefined) => {
    if (!day || !argument) return;
    return day?.entries.reduce((acc, entry) => {
      return acc + entry.food[argument] * entry.quantity;
    }, 0);
  };

  const getProgressRing = (props: {
    argument: 'calories' | 'protein' | 'carbs' | 'fat';
    default: number;
    label: string;
    size: number;
    strokeWidth: number;
  }) => {
    return (
      <ProgressRing
        progress={
          (getNutritionInfo(props.argument, day()) || 0 / (user()?.profile.calorie_goal || props.default)) * 100
        }
        size={props.size}
        strokeWidth={props.strokeWidth}
        label={props.argument}
      />
    );
  };

  return (
    <Container class="Home">
      <Show when={day()} fallback={<div>fetching user data</div>}>
        <div class="Home__healthRings">
          <div class="Home__healthRings__main">
            {getProgressRing({ argument: 'calories', default: 2000, label: 'Calories', size: 300, strokeWidth: 3 })}
          </div>
          <div class="Home__healthRings__rest">
            {getProgressRing({ argument: 'protein', default: 150, label: 'Protein', size: 100, strokeWidth: 7 })}
            {getProgressRing({ argument: 'carbs', default: 400, label: 'Carbs', size: 100, strokeWidth: 7 })}
            {getProgressRing({ argument: 'fat', default: 100, label: 'Fat', size: 100, strokeWidth: 7 })}
          </div>
        </div>
      </Show>

      <ul>
        <For each={day()?.entries}>
          {(entry) => (
            <li>
              {entry.food.name} - {entry.quantity}
            </li>
          )}
        </For>
      </ul>
      <Button class="mt-12" variant="outlined" onClick={() => setEntryModalOpen(true)}>
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
    </Container>
  );
}

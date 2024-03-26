import { createEffect, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { setUser, user } from '~/features/auth/services/UserService';
import { UserModel } from '~/features/auth/api';
import { Button, Container, Input } from '~/ui';
import { ProfileModel } from '../../api';
import './Profile.scss';

type ProfileForm = {
  name: string;
  weight: number;
  weight_goal: number;
  calorie_goal: number;
  protein_goal: number;
  carb_goal: number;
  fat_goal: number;
};

export const Profile = () => {
  const navigate = useNavigate();

  const [form, setForm] = createSignal<ProfileForm>({
    name: '',
    weight: 0,
    weight_goal: 0,
    calorie_goal: 0,
    protein_goal: 0,
    carb_goal: 0,
    fat_goal: 0,
  });

  createEffect(() => {
    if (user()?.profile) {
      setForm(user()?.profile as ProfileForm);
    }
  });

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    !user()?.profile
      ? ProfileModel.create({ ...form(), user: user()?.id }).then(() => {
          UserModel.get(user()?.id as string).then((res) => {
            setUser(res.data);
            navigate('/');
          });
        })
      : ProfileModel.update(user()?.profile?.id as string, form()).then(() => {
          UserModel.get(user()?.id as string).then((res) => {
            setUser(res.data);
            navigate('/');
          });
        });
  }

  function renderInput(label: string, type: string, name: keyof ProfileForm, placeholder?: string) {
    return (
      <div class="Profile__form__input">
        <p>{label}</p>
        <Input
          fluid
          placeholder={placeholder}
          type={type}
          value={form()[name]}
          onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
        />
      </div>
    );
  }

  return (
    <div class="Profile">
      <Container class="Profile__container">
        <form onSubmit={(e) => handleSubmit(e)} class="Profile__form shadow-sm">
          <h2>Profile</h2>
          <div class="Profile__form__inputs">
            {renderInput('Name', 'text', 'name', 'Your name')}
            <div class="Profile__form__inputs__grid">
              {renderInput('Weight (lbs)', 'number', 'weight')}
              {renderInput('Weight goal (lbs)', 'number', 'weight_goal')}
              {renderInput('Daily calorie goal', 'number', 'calorie_goal')}
              {renderInput('Daily protein goal (g)', 'number', 'protein_goal')}
              {renderInput('Daily carb goal (g)', 'number', 'carb_goal')}
              {renderInput('Daily fat goal (g)', 'number', 'fat_goal')}
            </div>
          </div>
          {!user()?.profile && (
            <p class="Profile__errorText">
              Please complete your profile before continuing.
              <br />
              Most fields can be left blank.
            </p>
          )}
          <Button rounded emphasized type="submit" variant="raised" class="Profile__submitButton">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
};

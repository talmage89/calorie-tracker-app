import { For, createEffect, createSignal } from 'solid-js';
import { Button, Input, Modal } from '~/ui';
import { FoodModel } from '../../api';
import { Food } from '../../types';
import './AddEntryModal.scss';

type AddEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddEntryModalForm) => void;
};

type AddEntryModalForm = {
  food: string;
  quantity: number;
};

type NewFoodForm = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const AddEntryModal = (props: AddEntryModalProps) => {
  const [foods, setFoods] = createSignal<Food[]>([]);
  const [form, setForm] = createSignal<AddEntryModalForm>({
    food: '',
    quantity: 1,
  });
  const [creatingFood, setCreatingFood] = createSignal(false);
  const [newFoodForm, setNewFoodForm] = createSignal<NewFoodForm>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  createEffect(() => {
    FoodModel.list().then((res) => setFoods(res.data.results));
  });

  const onCreateNewFood = (data: NewFoodForm) => {
    if (!data.name) return;
    FoodModel.create(data).then((res) => {
      setFoods((p) => [...p, res.data]);
      setCreatingFood(false);
      setNewFoodForm({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
      setForm((p) => ({ ...p, food: res.data.id }));
    });
  };

  const onSubmit = (data: AddEntryModalForm) => {
    if (!data.food || !(data.quantity > 0)) return;
    props.onSubmit(data);
    onClose();
  };

  const onClose = () => {
    setForm({ food: '', quantity: 1 });
    setCreatingFood(false);
    setNewFoodForm({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
    props.onClose();
  };

  function renderNewFoodForm() {
    const renderInput = (name: keyof NewFoodForm, label: string, type: string, placeholder?: string) => {
      return (
        <div class="AddEntryModal__newFoodForm__input">
          <p>{label}</p>
          <Input
            type={type}
            placeholder={placeholder}
            value={newFoodForm()[name]}
            onChange={(e) => setNewFoodForm((p) => ({ ...p, [name]: e.target.value }))}
          />
        </div>
      );
    };

    return (
      <div class="AddEntryModal__newFoodForm">
        <p class="AddEntryModal__newFoodForm__header">Creating new food....</p>
        {renderInput('name', 'Name', 'text', 'Enter food name')}
        {renderInput('calories', 'Calories', 'number')}
        {renderInput('protein', 'Protein', 'number')}
        {renderInput('carbs', 'Carbs', 'number')}
        {renderInput('fat', 'Fat', 'number')}
        <div class="AddEntryModal__newFoodForm__buttons">
          <Button variant="outlined" onClick={() => setCreatingFood(false)} class="AddEntryModal__newFoodForm__button">
            Cancel
          </Button>
          <Button
            variant="raised"
            class="AddEntryModal__newFoodForm__button"
            disabled={!newFoodForm().name}
            onClick={() => onCreateNewFood(newFoodForm())}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Modal isOpen={props.isOpen} onClose={() => onClose()} header="Add an entry" class="AddEntryModal__modal">
      <div class="AddEntryModal">
        <p>Add a meal or a meal item for your day.</p>
        {creatingFood() ? (
          renderNewFoodForm()
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form());
              }}
            >
              <div class="AddEntryModal__inputs">
                <span class="AddEntryModal__inputs__input">
                  <p class="AddEntryModal__inputs__input__label">Food</p>
                  <div>
                    <select value={form()?.food} onChange={(e) => setForm((p) => ({ ...p, food: e.target.value }))}>
                      <option value="">Select a food</option>
                      <For each={foods()}>{(food) => <option value={food.id}>{food.name}</option>}</For>
                    </select>
                    <Button
                      variant="outlined"
                      onClick={() => setCreatingFood(true)}
                      class="AddEntryModal__newFoodForm__button"
                    >
                      Create new food
                    </Button>
                  </div>
                </span>

                <span class="AddEntryModal__inputs__input">
                  <p class="AddEntryModal__inputs__input__label">Quantity</p>
                  <Input
                    type="number"
                    placeholder="1"
                    value={form()?.quantity}
                    onChange={(e) => setForm((p) => ({ ...p, quantity: parseInt(e.target.value) }))}
                  />
                </span>
              </div>
              <div class="AddEntryModal__buttons">
                <Button variant="outlined" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button variant="raised" type="submit" disabled={!form()?.food || !(form()?.quantity > 0)}>
                  Save
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

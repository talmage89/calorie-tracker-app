import { A } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { user } from '~/features/auth/services/UserService';
import {
  Badge,
  Button,
  Callout,
  Card,
  Checkbox,
  Container,
  DatePicker,
  Drawer,
  IconButton,
  Input,
  Menu,
  MenuItem,
  MultiSelect,
  Popover,
  Radio,
  Select,
  Spinner,
  TabItem,
  Tabs,
  Textarea,
  Toggle,
} from '~/ui';
import { Dialog } from '~/ui/Dialog/Dialog';

export function Home() {
  const [dialogOpen, setDialogOpen] = createSignal(false);
  const [drawerOpen, setDrawerOpen] = createSignal(false);
  const [popoverOpen, setPopoverOpen] = createSignal(false);

  return (
    <>
      <Container>
        <h1>Home</h1>
        <div>
          <A href="/login">Login</A>
        </div>
        {user() && (
          <div>
            <h2>User</h2>
            <p>{user()?.email}</p>
          </div>
        )}
      </Container>
    </>
  );
}

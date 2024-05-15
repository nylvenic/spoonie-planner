import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../models/utils/test-utils';
import userEvent from '@testing-library/user-event';
import CONSTANTS from '../../../models/utils/CONSTANTS';
import QuickAdd from './QuickAdd';
import { vi } from 'vitest';
import QuickAddPopup from '../../organisms/QuickAddPopup/QuickAddPopup'; // Adjust the import path as necessary

describe('QuickAdd Button Tests', () => {
    beforeAll(() => {
        HTMLDialogElement.prototype.show = vi.fn();
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    });

  it('QuickAddPopup is NOT on the screen initially', () => {
    render(
      <div>
        <QuickAdd />
        <QuickAddPopup />
      </div>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('QuickAddPopup appears on the screen on click of button with id of CONSTANTS.ids.QuickAddButton', async () => {
    render(
      <div>
        <QuickAdd />
        <QuickAddPopup />
      </div>
    );
    await userEvent.click(screen.getByTestId(CONSTANTS.ids.QuickAddButton));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

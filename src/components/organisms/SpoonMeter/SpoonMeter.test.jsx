import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../models/utils/test-utils.jsx';
import SpoonMeter from './SpoonMeter';
import CONSTANTS from '../../../models/utils/CONSTANTS.js';

describe('SpoonMeter tests', () => {
    it('Given 12 maxSpoons, there should be 12 unused items on the screen', () => {
        render(<SpoonMeter />, {
            providerProps: {
                spoonProviderProps: {
                    customMaxSpoons: 12,
                    customSpoons: 12,
                }
            }
        });
        const points = screen.getAllByTestId(CONSTANTS.ids.SpoonMeterPoint);
        const used = screen.queryAllByTestId(CONSTANTS.ids.SpoonMeterUsed);
        expect(points.length).toBe(12);
        expect(used.length).toBe(0); // Expecting no used spoons when maxSpoons equals spoons
    });

    it('Given 6 spoons, there should be 6 unused items and 6 used items on the screen', () => {
        render(<SpoonMeter />, {
            providerProps: {
                spoonProviderProps: {
                    customMaxSpoons: 12,
                    customSpoons: 6,
                }
            }
        });
        const points = screen.getAllByTestId(CONSTANTS.ids.SpoonMeterPoint);
        const used = screen.getAllByTestId(CONSTANTS.ids.SpoonMeterUsed);
        expect(points.length).toBe(6); // 6 unused spoons
        expect(used.length).toBe(6); // 6 used spoons
    });

    it('Given 0 spoons, there should be 12 used items on the screen and no unused items', () => {
        render(<SpoonMeter />, {
            providerProps: {
                spoonProviderProps: {
                    customMaxSpoons: 12,
                    customSpoons: 0,
                }
            }
        });

        const points = screen.queryAllByTestId(CONSTANTS.ids.SpoonMeterPoint);
        const used = screen.getAllByTestId(CONSTANTS.ids.SpoonMeterUsed);
        expect(points.length).toBe(0); // Expecting no unused spoons when spoons are 0
        expect(used.length).toBe(12); // All spoons are used
    });
});

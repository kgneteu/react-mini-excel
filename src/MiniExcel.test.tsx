import React from 'react';
import {render} from '@testing-library/react';
import MiniExcel from './MiniExcel';

test('renders expand button', () => {
    const view = render(<MiniExcel/>);
    expect(view.getByTitle(/expand sheet/i)).toBeInTheDocument();
})

test('renders shrink button', () => {
    const view = render(<MiniExcel/>);
    expect(view.getByTitle(/shrink sheet/i)).toBeInTheDocument();
})

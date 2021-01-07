// Core
import { MouseEvent, useState, useContext } from 'react'
import styled from '@emotion/styled'

// Components
import { Button } from '../Base'
import { Chart } from '../Chart'
import { ChartHeader } from '../ChartHeader'

// Hooks
import { useChartData } from './hooks/useChartData'

// Actions
import {
  fetchYandexChartDayData,
  fetchYandexChartWeekData,
  fetchYandexChartMonthData,
  fetchPaypalChartDayData,
  fetchPaypalChartWeekData,
  fetchPaypalChartMonthData
} from '../../init/actions'

// Utils
import { mockChartData, getCurrentMonthLength } from '../../utils'

// Types
import { ChartHeaderTypes } from '../ChartHeader'
import { ContextApp } from '../../init/reducer'

type ChartWidgetPropsTypes = ChartHeaderTypes & {
  type: 'yandex' | 'paypal';
}

// Styled components
const Wrap = styled('div')`
  width: 230px;
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    width: 100%;
  }

  @media (min-width: 780px) {
    width: 100%;
  }

  @media (min-width: 1200px) {
    width: 470px;
  }

  @media (min-width: 1300px) {
    width: 525px;
  }

  @media (min-width: 1400px) {
    width: 575px;
  }
`

const ButtonWrap = styled('div')`
  display: flex;
  margin-bottom: 0.6rem;
`

const ChartWrap = styled('div')`
  background-color: #FFFFFF;
  padding: 1rem;
  min-height: 315px;
`

// Component
export function ChartWidget(props: ChartWidgetPropsTypes) {
  const { type } = props;

  const [currentBtn, setCurrentBtn] = useState('День');
  const { dispatch } = useContext(ContextApp);
  const { data, proceedsSum, trendingSum } = useChartData(type, currentBtn)

  function currentButton(event: MouseEvent<HTMLButtonElement>) {
    const element = event.target as HTMLButtonElement;
    const value = element.value;
    setCurrentBtn(value);
  }

  function buttonHandler(event: MouseEvent<HTMLButtonElement>) {
    currentButton(event);
  }

  function mockDataHandler(event: MouseEvent<HTMLButtonElement>) {
    currentButton(event);

    dispatch(fetchYandexChartDayData(mockChartData(7)))
    dispatch(fetchPaypalChartDayData(mockChartData(7)))

    dispatch(fetchYandexChartWeekData(mockChartData(7, 'week')))
    dispatch(fetchPaypalChartWeekData(mockChartData(7, 'week')))
    
    dispatch(fetchYandexChartMonthData(mockChartData(getCurrentMonthLength())))
    dispatch(fetchPaypalChartMonthData(mockChartData(getCurrentMonthLength())))
  }

  return (
    <>
      <Wrap>
        <ButtonWrap>
          <Button
            value='День'
            type='button'
            onClick={buttonHandler}
            isActive={currentBtn === 'День' ? true : false}>День</Button>
          <Button
            value='Неделя'
            type='button'
            onClick={buttonHandler}
            isActive={currentBtn === 'Неделя' ? true : false}>Неделя</Button>
          <Button
            value='Месяц'
            type='button'
            onClick={buttonHandler}
            isActive={currentBtn === 'Месяц' ? true : false}>Месяц</Button>
          <Button
            value='Новые данные'
            type='button'
            onClick={mockDataHandler}
            isActive={currentBtn === 'Новые данные' ? true : false}>Новые данные</Button>
        </ButtonWrap>
        <ChartWrap>
          <ChartHeader {...props} desc={proceedsSum} trending={trendingSum}/>
          <Chart data={data} />
        </ChartWrap>
      </Wrap>
    </>
  );
}
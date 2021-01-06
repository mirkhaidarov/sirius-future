// Core
import Link from 'next/link'

// Components
import { Wrap, LinkWrap } from './index'
import { MainLayout } from '../components/MainLayout'
import { Navbar } from '../components/Navbar'

// Component
const Lessons = () => (
  <MainLayout>
    <Navbar />
    <Wrap>
      <h1>Занятия</h1>
      <Link href='/students'><LinkWrap>Вернуться назад</LinkWrap></Link>
    </Wrap>
  </MainLayout>
);

export default Lessons
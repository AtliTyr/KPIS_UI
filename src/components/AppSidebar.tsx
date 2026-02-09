import polytechLogoMainRgb11 from '@/assets/polytech_logo_main_RGB.png'
import polytechLogoMainBlack from '@/assets/polytech_logo_main_black-removebg-preview.png'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { Circle } from 'lucide-react'
import { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScrollArea } from './new_ui/scrollarea'

const navItems = [
  { title: 'Главная страница', url: '/' },
];

export const AppSidebar = (): JSX.Element => {
	const { pathname } = useLocation()
	const { theme, toggleTheme } = useTheme()
	const userInfo = { name: 'Иванов', patronymic: 'Иван Иванович' }
	const headerTitle = 'Система оценки показателей эффективности'
	const isDark = theme === 'dark'

	return (
		<div className='w-[250px] h-screen flrex flex-col justify-between bg-[var(--color-bg)] flex-shrink-0 shadow-xl px-[15px] py-[20px] rounded-r-xl'>
			{/* Верхняя часть с логотипом, пользователем и меню */}
			<nav className='h-[calc(100%-48px)] flex flex-col'>
				{/* Логотип */}
				<a className='px-3' href='/'>
					<img
						className='w-full h-full px-3'
						alt='Polytech logo'
						src={isDark ? polytechLogoMainBlack : polytechLogoMainRgb11}
					/>
				</a>

				<hr className='border-t-2 my-3 mx-2' />

				<div className='sidebarTitle accent-bold mb-6 mx-2 text-center'>
					{headerTitle}
				</div>

				{/* Пользователь */}
				<div className='mb-7'>
					<div className='w-20 h-20 defaultAvatar rounded-full mb-2'></div>
					<div className='text-center accent-bold sidebarUserName'>
						{userInfo.name}
						<br />
						{userInfo.patronymic}
					</div>
				</div>

				{/* Список меню — делает sidebar адаптивным */}
				<ScrollArea className='h-[100%] mx-2'>
					{navItems.map(item => {
						const isActive = pathname === item.url
						return (
							<Link
								key={item.url}
								to={item.url}
								className='flex items-center gap-2 py-2 pr-1'
							>
								<Circle
									className={cn(
										'w-4 h-4 flex-shrink-0 rounded-full sidebarLocationCircle stroke-none',
										isActive ? 'opacity-100' : 'opacity-0'
									)}
								/>
								<span
									className={cn(
										'accent-bold',
										isActive
											? 'sidebarActiveMenuItem'
											: 'sidebarNonActiveMenuItem'
									)}
								>
									{item.title}
								</span>
							</Link>
						)
					})}
				</ScrollArea>
			</nav>

			{/* Нижний блок с переключателем темы */}
			<div className='px-3 flex items-center justify-between hover:bg-[var(--color-bg-els-inside-main-el)]/30 h-12 w-full rounded-md cursor-pointer'>
				<span className='accent-semibold opacity-65'>Темная тема</span>
				<div className='sidebarSwitch'>
					<button
						onClick={toggleTheme}
						className={cn(
							'w-14 h-7 rounded-full p-1 flex items-center transition-colors duration-300',
							isDark ? 'sidebarSwitchDark' : 'sidebarSwitchLight'
						)}
					>
						<div
							className={cn(
								'bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300',
								isDark ? 'translate-x-7' : 'translate-x-0'
							)}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

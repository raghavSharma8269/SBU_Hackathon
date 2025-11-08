import './SideNav.css';
import AnimatedList from '../react_bits/AnimatedList/AnimatedList';

export default function SideNav() {
  // TODO: fetch courses from backend
  const items = [
    'Course 1',
    'Course 2',
    'Course 3',
    'Course 4',
    'Course 5',
    'Course 6',
    'Course 7',
    'Course 8',
    'Course 9',
    'Course 10',
  ];

  return (
    <aside className="side-nav">
      {/* search bar, filters, course list */}
      <div className="p-4 font-bold">All Courses</div>
      
      <AnimatedList>
        items={items}
        onItemSelect={(item, index) => console.log(item, index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      </AnimatedList>

    </aside>
  );
}
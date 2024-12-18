import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navMenus = [
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Add product",
    link: "/add-product",
  },
  {
    name: "Cart",
    link: "/cart",
  },
];

const Navbar = () => {
  return (
    <header className="px-5 py-3">
      <NavigationMenu>
        <NavigationMenuList>
          {navMenus.map((menu) => {
            return (
              <NavigationMenuItem key={menu.link}>
                <Link href={menu.link} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;

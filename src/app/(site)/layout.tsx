import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * 路由组布局：把「页头 + 页脚」挂在 (site) 组里，
 * 根 layout 只负责 <html>/<body> 和全局样式。
 * 这样全局 404（/404 页面）不会去渲染依赖 usePathname 的组件，
 * 也让布局职责更清晰。
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

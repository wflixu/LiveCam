// use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri::{
    menu::{MenuBuilder, MenuItemBuilder, MenuItem, Menu},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&quit_i])?;

            let tray = TrayIconBuilder::new()
                .menu(&menu)
                .menu_on_left_click(true)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                      println!("quit menu item was clicked");
                      app.exit(0);
                    }
                    _ => {
                      println!("menu item {:?} not handled", event.id);
                    }
                  })
                .build(app)?;

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// fn main() {
//     let quit = CustomMenuItem::new("quit".to_string(), "Quit");

//     let tray_menu = SystemTrayMenu::new()
//         .add_item(quit);
//     let tray = SystemTray::new().with_menu(tray_menu);

//     tauri::Builder::default()
//         .system_tray(tray)
//         .on_system_tray_event(|app, event| match event {
//           SystemTrayEvent::LeftClick {
//             position: _,
//             size: _,
//             ..
//           } => {
//             println!("system tray received a left click");
//           }
//           SystemTrayEvent::RightClick {
//             position: _,
//             size: _,
//             ..
//           } => {
//             println!("system tray received a right click");
//           }
//           SystemTrayEvent::DoubleClick {
//             position: _,
//             size: _,
//             ..
//           } => {
//             println!("system tray received a double click");
//           }
//           SystemTrayEvent::MenuItemClick { id, .. } => {
//             match id.as_str() {
//               "quit" => {
//                 std::process::exit(0);
//               }
//               // "hide" => {
//               //   let window = app.get_window("main").unwrap();
//               //   window.hide().unwrap();
//               // }

//               _ => {}
//             }
//           }
//           _ => {}
//         })
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

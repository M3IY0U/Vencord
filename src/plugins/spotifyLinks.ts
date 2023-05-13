/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { addClickListener, removeClickListener } from "@api/MessageEvents";
import definePlugin from "@utils/types";


export default definePlugin({
    name: "Spotify Links",
    description: "Opens Spotify links in the desktop app instead of the browser.",
    authors: [
        {
            id: 137234090309976064n,
            name: "Meiyou",
        },
    ],
    start() {
        this.onClick = addClickListener((msg, channel, event) => {
            if (!(event.target instanceof (HTMLAnchorElement))) return;

            if (event.target.href.includes("open.spotify.com")) {
                event.preventDefault();

                const url = event.target.href.split("/");
                VencordNative.native.openExternal(`spotify://${url[3]}/${url[url.length - 1]}`);
            }
        });
    },
    stop() {
        removeClickListener(this.onClick);
    },
});

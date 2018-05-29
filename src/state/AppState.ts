


export class AppState {
    public drawerOpen: boolean = false;

    public openDrawer() {
        this.drawerOpen = true;
    }

    public closeDrawer() {
        this.drawerOpen = false;
    }
}
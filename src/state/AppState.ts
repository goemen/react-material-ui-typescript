import { observable } from 'mobx';

export class AppState {
    @observable 
    public drawerOpen: boolean = false;

    public openDrawer() {
        this.drawerOpen = true;
    }

    public closeDrawer() {
        this.drawerOpen = false;
    }
}
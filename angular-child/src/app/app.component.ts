import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userJson: string | null = null;
  unsubscribe: (() => void) | null = null;
  globalStore: any;

  get parsedUser(): { name: string; role: string } | null {
    return this.userJson ? JSON.parse(this.userJson) : null;
  }

  ngOnInit(): void {
    (async () => {
      const mod = await import('host/GlobalStore');
      this.globalStore = mod.default;

      const currentUser = this.globalStore.getState().user;
      if (currentUser) {
        this.userJson = JSON.stringify(currentUser);
      }

      this.unsubscribe = this.globalStore.subscribe((newState: any) => {
        if (newState.user) {
          this.userJson = JSON.stringify(newState.user);
        }
      });
    })();
  }

  updateUser() {
    if (this.globalStore) {
      this.globalStore.setState({
        user: {
          name: 'Angular',
          role: 'editor',
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe();
  }
}

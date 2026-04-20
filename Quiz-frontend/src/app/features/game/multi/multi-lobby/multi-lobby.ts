import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';


interface Player {
  id: number;
  name: string;
  avatar: string;
  isCurrentUser?: boolean;
  waiting?: boolean;
}


interface ModeInfo {
  name: string;
  icon: string;
  desc: string;
}


@Component({
  selector: 'app-multi-lobby',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './multi-lobby.html',
  styleUrls: ['./multi-lobby.css']
})
export class MultiLobby implements OnInit {


  /**
   * URL params:
   *   /play/multi/lobby?mode=classic&role=host
   *   /play/multi/lobby?mode=classic&role=player
   *   /play/multi/lobby?mode=focus&role=host
   *   /play/multi/lobby?mode=focus&role=player
   */
  isHost: boolean = true;
  gameMode: string = 'classic';
  gamePin: string = '842 931';
  currentUserName: string = 'Alex Rivera';


  get modeInfo(): ModeInfo {
    if (this.gameMode === 'focus') {
      return { name: 'Focus Mode', icon: 'psychology', desc: 'High intensity play' };
    }
    return { name: 'Classic Mode', icon: 'groups', desc: 'Standard competition' };
  }


  // Dữ liệu HOST — avatar kiểu portrait người thật
  private hostPlayers: Player[] = [
    { id: 1,  name: 'Alex',    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Alex'    },
    { id: 2,  name: 'Sarah',   avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Sarah'   },
    { id: 3,  name: 'Quinn',   avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Quinn'   },
    { id: 4,  name: 'Jordan',  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Jordan'  },
    { id: 5,  name: 'Taylor',  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Taylor'  },
    { id: 6,  name: 'Riley',   avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Riley'   },
    { id: 7,  name: 'Charlie', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Charlie' },
    { id: 8,  name: 'Morgan',  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Morgan'  },
    { id: 9,  name: 'Peyton',  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Peyton'  },
    { id: 10, name: 'Skyler',  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Skyler'  },
    { id: 11, name: 'Casey',   avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Casey'   },
    { id: 12, name: '',        avatar: '', waiting: true                                         },
  ];


  // Dữ liệu PLAYER — avatar kiểu portrait người thật
  private playerPlayers: Player[] = [
    { id: 1,  name: 'Alex Rivera', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=AlexRivera', isCurrentUser: true },
    { id: 2,  name: 'Sarah_Q',     avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=SarahQ'     },
    { id: 3,  name: 'MikeyW',      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=MikeyW'     },
    { id: 4,  name: 'LunaStar',    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=LunaStar'   },
    { id: 5,  name: 'Alex.Dev',    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=AlexDev'    },
    { id: 6,  name: 'Zara_99',     avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Zara99'     },
    { id: 7,  name: 'CyberKai',    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=CyberKai'   },
    { id: 8,  name: 'Nicooo',      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Nicooo'     },
    { id: 9,  name: 'Sofia_G',     avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=SofiaG'     },
    { id: 10, name: 'T-Rex',       avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=TRex'       },
    { id: 11, name: 'Yara.P',      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=YaraP'      },
    { id: 12, name: 'BigBen',      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=BigBen'     },
  ];


  players: Player[] = [];


  constructor(private router: Router, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.gameMode = params['mode'] || 'classic';
      this.isHost   = params['role'] !== 'player';
      this.players  = this.isHost ? this.hostPlayers : this.playerPlayers;
    });
  }


  startGame(): void {
    this.router.navigate(['/play/multi/room'], {
      queryParams: { mode: this.gameMode }
    });
  }


  leaveRoom(): void {
    this.router.navigate(['/play/multi/mode']);
  }
}
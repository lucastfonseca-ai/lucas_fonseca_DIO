import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  postsRelacionados: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.post = this.postsService.getPostPorSlug(slug);
        if (!this.post) {
          this.router.navigate(['/']);
          return;
        }
        this.carregarRelacionados();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  carregarRelacionados(): void {
    if (!this.post) return;
    const todos = this.postsService.getTodosOsPosts();
    this.postsRelacionados = todos
      .filter(p => p.id !== this.post!.id && p.categoria === this.post!.categoria)
      .slice(0, 2);

    if (this.postsRelacionados.length < 2) {
      const outros = todos
        .filter(p => p.id !== this.post!.id && !this.postsRelacionados.includes(p))
        .slice(0, 2 - this.postsRelacionados.length);
      this.postsRelacionados = [...this.postsRelacionados, ...outros];
    }
  }

  formatarData(data: string): string {
    const date = new Date(data + 'T12:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}

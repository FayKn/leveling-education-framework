use tidos::{scoped_css, view, Component, Page};
use crate::domain::{Activiteit, Architectuurlaag, Icon, Skill, PERSONAL_SKILLS, PRODUCT_SKILLS, SOCIAL_SKILLS};

pub struct SkillFilterMatrix<'a> {
    pub filter: &'a Option<Skill>
}


impl<'a> Component for SkillFilterMatrix<'a> {
    fn to_render(&self, page: &mut Page) -> String {
        view! {
            <header class={scoped_css!("skill_filter_matrix.css")}>
                <div>
                    {#for x in PRODUCT_SKILLS}
                        <a
                            class="product-skill"
                            href={state_dependent_link(&self.filter, &x)}
                            aria-label={x.to_text()}
                            :lef-link-active={self.filter.as_ref().map_or(false, |o| o.eq(&x))}
                        >
                            <span class="material-symbols-outlined" style="font-size: 48px;">{x.to_icon()}</span>
                            <span>{x.to_text()}</span>
                        </a>
                    {/for}
                </div>
                <div>
                    {#for x in SOCIAL_SKILLS}
                        <a class="social-skill" href={state_dependent_link(&self.filter, &x)} aria-label={x.to_text()} :lef-link-active={self.filter.as_ref().map_or(false, |o| o.eq(&x))}>
                            <span class="material-symbols-outlined" style="font-size: 48px;">{x.to_icon()}</span>
                            <span>{x.to_text()}</span>
                        </a>
                    {/for}
                </div>
                <div>
                    {#for x in PERSONAL_SKILLS}
                        <a class="personal-skill" href={state_dependent_link(&self.filter, &x)} aria-label={x.to_text()} :lef-link-active={self.filter.as_ref().map_or(false, |o| o.eq(&x))}>
                            <span class="material-symbols-outlined" style="font-size: 48px;">{x.to_icon()}</span>
                            <span>{x.to_text()}</span>
                        </a>
                    {/for}
                </div>
            </header>
        }
    }
}

fn state_dependent_link(state: &Option<Skill>, value: &Skill) -> String {
    match state {
        None => {format!("/?vaardigheid={}", value.to_text())}
        Some(state) => {
            if !state.eq(value) {
                format!("/?vaardigheid={}", value.to_text())
            } else {
                "/".to_string()
            }
        }
    }
}

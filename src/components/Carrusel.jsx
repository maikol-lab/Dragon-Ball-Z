const Carrusel = () => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide vh-100">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={3} aria-label="Slide 4" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={4} aria-label="Slide 5" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={5} aria-label="Slide 6" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={6} aria-label="Slide 7" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={7} aria-label="Slide 8" />
            </div>

            <div className="carousel-inner h-100">
                {/* Slide 1 */}
                <div className="carousel-item active h-100">
                    <img src="/images/peronajes1.png" className="d-block w-100 h-100" alt="Dragon Ball Universe"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-warning mb-4 animate__animated animate__fadeInDown">
                            El Universo de Dragon Ball
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Explora el vasto universo lleno de héroes, villanos y batallas épicas.
                        </p>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="carousel-item h-100">
                    <img src="/images/peronajes2.jpg" className="d-block w-100 h-100" alt="Personajes Legendarios"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-danger mb-4 animate__animated animate__fadeInDown">
                            Personajes Legendarios
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Conoce a Goku, Vegeta, Gohan y todos los guerreros Z.
                        </p>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="carousel-item h-100">
                    <img src="/images/git.gif" className="d-block w-100 h-100" alt="Transformaciones Poderosas"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-info mb-4 animate__animated animate__fadeInDown">
                            Transformaciones Poderosas
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Descubre las increíbles transformaciones de Super Saiyajin.
                        </p>
                    </div>
                </div>

                {/* Slide 4 */}
                <div className="carousel-item h-100">
                    <img src="/images/git2.gif" className="d-block w-100 h-100" alt="Planetas Misteriosos"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-success mb-4 animate__animated animate__fadeInDown">
                            Planetas Misteriosos
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Viaja por Namek, Tierra, Vegeta y otros planetas increíbles.
                        </p>
                    </div>
                </div>

                {/* Slide 5 */}
                <div className="carousel-item h-100">
                    <img src="/images/git6.gif" className="d-block w-100 h-100" alt="Batallas Épicas"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-primary mb-4 animate__animated animate__fadeInDown">
                            Batallas Épicas
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Revive las batallas más emocionantes de la serie.
                        </p>
                    </div>
                </div>

                {/* Slide 6 */}
                <div className="carousel-item h-100">
                    <img src="/images/git4.gif" className="d-block w-100 h-100" alt="Tecnología Avanzada"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-light mb-4 animate__animated animate__fadeInDown">
                            Tecnología Avanzada
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Explora las naves espaciales, cápsulas y dispositivos futuristas.
                        </p>
                    </div>
                </div>

                {/* Slide 7 */}
                <div className="carousel-item h-100">
                    <img src="/images/git5.gif" className="d-block w-100 h-100" alt="Artes Marciales"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-warning mb-4 animate__animated animate__fadeInDown">
                            Artes Marciales
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Domina las técnicas de combate más poderosas del universo.
                        </p>
                    </div>
                </div>

                {/* Slide 8 */}
                <div className="carousel-item h-100">
                    <img src="/images/gi7.gif" className="d-block w-100 h-100" alt="Esferas del Dragón"
                        style={{ objectFit: "cover" }} />
                    <div className="carousel-caption d-none d-md-block" style={{ bottom: "20%", left: "10%", right: "10%" }}>
                        <h5 className="display-4 fw-bold text-info mb-4 animate__animated animate__fadeInDown">
                            Esferas del Dragón
                        </h5>
                        <p className="fs-3 animate__animated animate__fadeIn animate__delay-1s">
                            Reúne las 7 esferas y pide cualquier deseo al dragón Shenlong.
                        </p>
                    </div>
                </div>
            </div>

            {/* Controles de navegación - MÁS GRANDES */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" style={{ width: "50px", height: "50px" }} aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" style={{ width: "50px", height: "50px" }} aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carrusel;